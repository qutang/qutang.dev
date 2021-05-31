import * as pkg from "@octokit/rest";
import pkg2 from "@octokit/rest";
import jupyterRenderer from "./jupyter";
import customMarked from "./md-it";
import fs from "fs";
import path from "path";
const cwd = process.cwd();
const { NODE_ENV, GITHUB_QUTANG_DEV_TOKEN } = process.env;
const dev = NODE_ENV === "development";




class GitHub {
  constructor() {
    // workaround because octokit/rest is commonjs format, requiring different import method in dev or export mode.
    // this._token = token;
  }

  connect() {
    if (dev) {
      const Octokit = pkg.Octokit;
      this._client = new Octokit({
        auth: GITHUB_QUTANG_DEV_TOKEN,
        userAgent: "qutang.dev github",
        timeZone: "US/New York",
      });
    } else {
      const { Octokit } = pkg2;
      this._client = new Octokit({
        auth: GITHUB_QUTANG_DEV_TOKEN,
        userAgent: "qutang.dev github",
        timeZone: "US/New York",
      });
    }
  }

  async getProjects(projects) {
    if (this._checkCache("projects")) {
      return this._readCache("projects");
    }
    this.connect();
    const limit = await this._client.rateLimit.get();
    let projs = await Promise.all(
      projects.map(async (proj) => {
        let result;
        if (proj["path"] != null) {
          result = await this._client.repos.getContent({
            owner: proj["owner"],
            repo: proj["repo"],
            path: proj["path"],
            mediaType: {
              format: "raw",
            },
          });
        } else {
          console.log(proj['repo']);
          result = await this._client.repos.getReadme({
            owner: proj["owner"],
            repo: proj["repo"],
            mediaType: {
              format: "raw",
            },
          });
          console.log(proj['repo'] + " done");
        }
        let license = await this._client.licenses
          .getForRepo({
            owner: proj["owner"],
            repo: proj["repo"],
          })
          .catch((err) =>
            console.log(`Error in getting license: ${err.status}`)
          );
        if (license !== undefined) {
          license = license.data["license"]["name"];
        } else {
          license = "License not set";
        }
        let html_result = customMarked(result.data);
        result = {
          html: html_result.html,
          src: `https://github.com/${proj["owner"]}/${proj["repo"]}`,
          name: proj["name"],
          owner: proj["owner"],
          repo: proj["repo"],
          license: license,
          official: proj["official"],
          desc: proj["desc"],
          tags: proj["tags"],
        };
        return result;
      })
    );
    this._cacheObj(projs, "projects");
    return projs;
  }

  async getPosts() {
    if (this._checkCache("posts")) {
      return this._readCache("posts");
    }
    this.connect();
    let rawPosts = await this._client.repos.getContent({
      owner: "qutang",
      repo: "jupyter_notebook_articles",
    });
    rawPosts = rawPosts["data"];
    rawPosts = await rawPosts.filter((raw) => {
      return raw["url"].includes("ipynb");
    });

    let posts = await Promise.all(
      rawPosts.map(async (raw) => {
        let result = await this._getPost(raw["path"]);
        result = { ...result, sha: raw["sha"] };
        return result;
      })
    );
    this._cacheObj(posts, "posts");
    return posts;
  }

  async getPost(path) {
    let cacheName = path;
    if (this._checkCache(cacheName)) {
      return this._readCache(cacheName);
    }
    this.connect();
    let result = this._getPost(path);
    this._cachePosts(result, cacheName);
    return result;
  }

  async _getPost(path) {
    // const fetch = require("node-fetch");
    const response = await fetch(
      `https://raw.githubusercontent.com/qutang/jupyter_notebook_articles/main/${path}`
    );
    const content = await response.json();
    let slug = path.split(".")[0];
    let result = jupyterRenderer(content, slug);
    let html = result.html;
    let meta = result.meta;
    let src =
      "https://colab.research.google.com/github/qutang/jupyter_notebook_articles/blob/main/" +
      path;
    return {
      ...meta,
      slug,
      src,
      html,
    };
  }

  _getCacheName(name) {
    return path.join(cwd, ".cache", `${"jupyter_" + name}.json`);
  }

  async _cacheObj(obj, name) {
    console.log(`Caching github object: ${name}`);
    const cache = JSON.stringify(obj);
    const cacheFile = this._getCacheName(name);
    if (!fs.existsSync(path.dirname(cacheFile))) {
      fs.mkdirSync(path.dirname(cacheFile));
    }
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

export default new GitHub();
