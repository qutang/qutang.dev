import { customMarked } from "../../_plugins/markdown";
import { jupyterRenderer } from "../../_plugins/jupyter";

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, "contents/");
const posts_per_page = 6;

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter(fileName => /\.((md)|(ipynb))$/.test(fileName))
  .map((fileName, index) => {
    const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
    const slug = fileName.split(".")[0];
    const extension = fileName.split(".")[1];
    let excerpt = "";
    let title = undefined;
    let html = undefined;
    let page = Math.floor(index / posts_per_page) + 1;
    if (extension == "md") {
      html = customMarked({}, fileMd, "/blog/" + slug);
    } else if (extension == "ipynb") {
      html = jupyterRenderer(fileMd, "/blog/" + slug);
    }

    return {
      title: title || slug,
      src:
        "https://github.com/qutang/v2.qutang.dev/blob/master/contents/" +
        fileName,
      slug,
      html,
      page: page.toString()
    };
  });

let totalPages = Math.max(...posts.map(post => post.page));

// posts.sort((a, b) => {
//   const dateA = new Date(a.date);
//   const dateB = new Date(b.date);

//   if (dateA > dateB) return -1;
//   if (dateA < dateB) return 1;
//   return 0;
// });

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, "");
});

export default { posts, totalPages };