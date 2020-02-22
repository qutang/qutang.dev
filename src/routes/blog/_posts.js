import { customMarked } from "../../_plugins/markdown";
import { jupyterRenderer } from "../../_plugins/jupyter";

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, "contents/");
const posts_per_page = 5;

let posts = fs
  .readdirSync(POSTS_DIR)
  .filter(fileName => /\.((md)|(ipynb))$/.test(fileName))
  .map((fileName, index) => {
    const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
    const slug = fileName.split(".")[0];
    const extension = fileName.split(".")[1];

    let result = undefined;
    if (extension == "md") {
      result = customMarked({}, fileMd, "/blog/" + slug);
    } else if (extension == "ipynb") {
      result = jupyterRenderer(fileMd, "/blog/" + slug);
    }

    let html = result.html;
    let meta = result.meta;

    return {
      ...meta,
      src:
        "https://github.com/qutang/qutang.dev/blob/master/contents/" +
        fileName,
      slug,
      html
    };
  })
  .filter(post => post.type == "post")
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  })
  .map((post, index) => {
    let page = Math.floor(index / posts_per_page) + 1;
    post["page"] = page.toString();
    return post;
  });

let totalPages = Math.max(...posts.map(post => post.page));

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, "");
});

posts = posts;

export default { posts, totalPages };
