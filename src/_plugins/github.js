import { Octokit } from "@octokit/rest";
import { jupyterRenderer } from "./jupyter";
global.atob = require("atob");
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";


const user_token = process.env.GITHUB_QUTANG_DEV_TOKEN;

class GitHub {
    constructor(token) {
        this._client = new Octokit({
            auth: token,
            userAgent: "qutang.dev github",
            timeZone: "US/New York"
        });
    }

    _decodeUnicode(base64Str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(base64Str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    async getPosts() {
        if (this._checkCache('posts')) {
            return this._readCache('posts');
        }
        let rawPosts = await this._client.repos.getContent({
            owner: 'qutang',
            repo: 'jupyter_notebook_articles'
        });
        rawPosts = rawPosts['data'];
        rawPosts = await rawPosts.filter((raw) => {
            return raw['url'].includes('ipynb')
        });
        
        let posts = await Promise.all(
            rawPosts.map(async (raw) => {
                let result = await this._getPost(raw['path']);
                result = {...result, sha: raw['sha']}
                return result;
            })
        );
        this._cacheObj(posts, 'posts');
        return posts;
    }

    async getPost(path) {
        let cacheName = path;
        if (this._checkCache(cacheName)) {
          return this._readCache(cacheName);
        }
        let result = this._getPost(path);
        this._cachePosts(result, cacheName);
        return result;
    }

    async _getPost(path) {
        const fetch = require('node-fetch');
        const response = await fetch(`https://raw.githubusercontent.com/qutang/jupyter_notebook_articles/main/${path}`);
        const content = await response.json();
        let slug = path.split('.')[0];
        let result = jupyterRenderer(content, slug);
        let html = result.html;
        let meta = result.meta;
        let src = "https://colab.research.google.com/github/qutang/jupyter_notebook_articles/blob/main/" + path;
        return {
            ...meta,
            slug,
            src,
            html,
        };
    }

    _getCacheName(name) {
        if (dev) {
          return path.join(cwd, "__sapper__", "dev", `${'jupyter_' + name}.json`);
        } else {
          return path.join(cwd, "__sapper__", "build", `${'jupyter_' + name}.json`);
        }
    }

    async _cacheObj(obj, name) {
        console.log(`Caching github object: ${name}`);
        const cache = JSON.stringify(obj);
        fs.writeFileSync(this._getCacheName(name), cache);
    }
    
    _checkCache(name) {
        return fs.existsSync(this._getCacheName(name));
    }

    _readCache(name) {
        console.log(`Reading github cache: ${name}`);
        const cache = fs.readFileSync(this._getCacheName(name));
        return JSON.parse(cache);
    }
}

export default new GitHub(user_token);