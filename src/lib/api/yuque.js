import customMarked from "./md-it";
import fs from "fs";
import path from "path";
import yuque_sdk from "@yuque/sdk";

const cwd = process.cwd();
const { NODE_ENV, YUQUE_TOKEN } = process.env;
const dev = NODE_ENV === "development";
const user_token = YUQUE_TOKEN;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class YuQue {
  constructor(token) {
    this._token = token;
  }

  connect() {
    this._client = new yuque_sdk({
      token: this._token,
      // other options
    });
  }

  _getCacheName(name) {
    return path.join(cwd, ".cache", `${name}.json`);
  }

  async _cachePosts(obj, name) {
    console.log(`Caching yuque object: ${name}`);
    const cache = JSON.stringify(obj);
    const cacheFile = this._getCacheName(name);
    if (!fs.existsSync(path.dirname(cacheFile))) {
      fs.mkdirSync(path.dirname(cacheFile));
    }
    fs.writeFileSync(cacheFile, cache);
  }

  _checkCache(name) {
    return fs.existsSync(this._getCacheName(name));
  }

  _readCache(name) {
    console.log(`Reading yuque cache: ${name}`);
    const cache = fs.readFileSync(this._getCacheName(name));
    return JSON.parse(cache);
  }

  async _getPostContent(repoName, slug) {
    let content = await this._client.docs.get({
      namespace: `qutang/blog-${repoName}`,
      slug: slug,
      data: {
        raw: 1,
      },
    });
    content.body = "${toc}\n\n" + content.body;
    let html = customMarked(content.body).html;
    return html;
  }

  async getPost(repoName, slug) {
    let cacheName = `${repoName}-${slug}`;
    if (this._checkCache(cacheName)) {
      return this._readCache(cacheName);
    }
    this.connect();
    let content = await this._client.docs.get({
      namespace: `qutang/blog-${repoName}`,
      slug: slug,
      data: {
        raw: 1,
      },
    });
    content.body = "${toc}\n\n" + content.body;
    let html = customMarked(content.body).html;
    let result = {
      title: content.title,
      slug: content.slug,
      description: content.description,
      update_date: content.updated_at,
      create_date: content.created_at,
      cover: content.cover,
      series: repoName,
      src: `https://www.yuque.com/qutang/blog-${repoName}/${content.slug}`,
      html: html,
    };
    this._cachePosts(result, cacheName);
    return result;
  }

  async getRepos() {
    let cacheName = "repos";
    if (this._checkCache(cacheName)) {
      return this._readCache(cacheName);
    }
    this.connect();
    let repos = await this._client.repos.list({ user: "qutang" });
    repos = await repos.filter((repo) => repo.namespace.includes("blog"));
    repos = await repos.map((repo) => repo.namespace.split("-")[1]);
    this._cachePosts(repos, cacheName);
    return repos;
  }

  async getPosts(repoName) {

    let posts;
    if (repoName !== undefined) {
      let cacheName = repoName;
      if (this._checkCache(cacheName)) {
        return this._readCache(cacheName);
      }
      this.connect();
      let rawPosts = await this._client.docs.list({
        namespace: `qutang/blog-${repoName}`,
      });
      rawPosts = await rawPosts.filter((raw) => {
        return raw.status == 1 && raw.public == 1;
      });
      posts = await Promise.all(
        rawPosts.map(async (raw) => {
          let html = await this._getPostContent(repoName, raw.slug);
          let result = {
            title: raw.title,
            slug: raw.slug,
            description: raw.description,
            update_date: raw.updated_at,
            create_date: raw.created_at,
            cover: raw.cover,
            series: repoName,
            src: `https://www.yuque.com/qutang/blog-${repoName}/${raw.slug}`,
            html: html,
          };
          return result;
        })
      );
      this._cachePosts(posts, cacheName);
    } else {
      let repos = await this.getRepos();
      posts = await Promise.all(
        repos.map(async (repo) => {
          await sleep(randomInt(1000));
          return this.getPosts(repo);
        })
      );
      posts = await [].concat(...posts);
    }
    return posts;
  }
}

export default new YuQue(user_token);
