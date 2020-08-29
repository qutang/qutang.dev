import { customMarked } from "./md-it";
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const user_token = process.env.YUQUE_TOKEN;
class YuQue {
  constructor(token) {
    const SDK = require("@yuque/sdk");
    this._client = new SDK({
      token: token,
      // other options
    });
  }

  _getCacheName(name) {
    if (dev) {
      return path.join(cwd, "__sapper__", "dev", `${name}.json`);
    } else {
      return path.join(cwd, "__sapper__", "build", `${name}.json`);
    }
  }

  async _cachePosts(obj, name) {
    console.log(`Caching yuque object: ${name}`);
    const cache = JSON.stringify(obj);
    fs.writeFileSync(this._getCacheName(name), cache);
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
      date: content.updated_at,
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
      let rawPosts = await this._client.docs.list({
        namespace: `qutang/blog-${repoName}`,
      });
      posts = await Promise.all(
        rawPosts.map(async (raw) => {
          let html = await this._getPostContent(repoName, raw.slug);
          let result = {
            title: raw.title,
            slug: raw.slug,
            description: raw.description,
            date: raw.updated_at,
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
          return this.getPosts(repo);
        })
      );
      posts = await [].concat(...posts);
    }
    return posts;
  }
}

export default new YuQue(user_token);

// "AzLuOScwp4WiV29sd6NXVQl8h7bjkViJuTlw1nUn"

// async function main() {
//   let client = new YuQue("AzLuOScwp4WiV29sd6NXVQl8h7bjkViJuTlw1nUn");
//   // client.getPosts("programming");
//   let posts = await client.getPosts();
//   console.log(posts);
//   // client.getRepos();
// }

// main();
