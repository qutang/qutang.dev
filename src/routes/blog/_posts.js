import { customMarked } from "../../_plugins/md-it";
import { jupyterRenderer } from "../../_plugins/jupyter";
import yuqueClient from "../../_plugins/yuque2";
const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, "contents/");
const posts_per_page = 5;

let parse_post = function (filename) {
  const fileMd = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const slug = filename.split(".")[0];
  const extension = filename.split(".")[1];

  let result = undefined;
  let src = undefined;

  if (extension == "md") {
    result = customMarked(fileMd);
    src =
      "https://github.com/qutang/qutang.dev/blob/master/contents/" + filename;
  } else if (extension == "ipynb") {
    result = jupyterRenderer(fileMd, slug);
    src =
      "https://colab.research.google.com/github/qutang/qutang.dev/blob/master/contents/" +
      filename;
  }

  let html = result.html;
  let meta = result.meta;

  return {
    ...meta,
    src,
    slug,
    html,
  };
};

let compare_posts = function (a, b) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
};

let paginate = function (post, index) {
  let page = Math.floor(index / posts_per_page) + 1;
  post["page"] = page.toString();
  return post;
};

let clean_html = function (post) {
  post.html = post.html.replace(/^\t{3}/gm, "");
  return post;
};

let get_total_pages = async function (posts) {
  let pages = await posts.map((post) => post.page);
  let totalPages = await Math.max(...pages);
  return totalPages;
};

let get_posts = async function (slug) {
  let yuquePosts = await yuqueClient.getPosts();
  let posts = await fsPromises.readdir(POSTS_DIR);
  posts = await posts.filter((fileName) => /\.((md)|(ipynb))$/.test(fileName));
  if (slug !== undefined) {
    posts = await posts.filter((filename) => filename.includes(slug));
    yuquePosts = await yuquePosts.filter((post) => post.slug == slug);
  }
  posts = await posts.map((filename, _) => {
    return parse_post(filename);
  });
  posts = await posts.filter((post) => post.type == "post");
  posts = await posts.concat(yuquePosts);
  posts = await posts.sort(compare_posts);
  posts = await posts.map(paginate);
  posts = await posts.map(clean_html);

  let totalPages = await get_total_pages(posts);
  return { posts: posts, totalPages: totalPages };
};

export { get_posts };

// async function main() {
//   const result = await get_posts();
//   const posts = result.posts;
//   const totalPages = result.totalPages;
//   console.log(posts.map((post) => post.page));
//   console.log(totalPages);
// }

// main();
