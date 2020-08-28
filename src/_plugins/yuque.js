import { customMarked } from "./md-it";
import fs from "fs";
const path = require("path");
const cwd = process.cwd();

async function cache_posts(posts) {
  const cache = JSON.stringify(posts);
  fs.writeFileSync(
    path.join(cwd, "__sapper__", "dev", "yuque_cache.json"),
    cache
  );
}

function check_cache() {
  return fs.existsSync(path.join(cwd, "__sapper__", "dev", "yuque_cache.json"));
}

function read_cache() {
  const cache = fs.readFileSync(
    path.join(cwd, "__sapper__", "dev", "yuque_cache.json")
  );
  return JSON.parse(cache);
}

async function parse_post(post) {
  post.body = "${toc}\n\n" + post.body;
  let result = {
    title: post.title,
    html: customMarked(post.body).html,
    date: post.updated_at,
    src: "https://www.yuque.com/qutang/blog/" + post.slug + "/edit",
    slug: post.slug,
    series: "programming",
  };

  return result;
}

async function fetch_from_online(slug) {
  const SDK = require("@yuque/sdk");
  const client = new SDK({
    token: "AzLuOScwp4WiV29sd6NXVQl8h7bjkViJuTlw1nUn",
    // other options
  });

  //   const userInfo = await client.users.get();
  // console.log(userInfo);
  let docsInfo;
  if (slug !== undefined) {
    docsInfo = await client.docs.get({
      namespace: "qutang/blog",
      slug: slug,
      data: {
        raw: 1,
      },
    });
  } else {
    docsInfo = await client.docs.get({
      namespace: "qutang/blog",
      slug: "ny150b",
      data: {
        raw: 1,
      },
    });
  }

  return docsInfo;
}

export async function get_yuque_posts(slug) {
  let result;
  if (check_cache()) {
    console.log("Load yuque posts from cache...");
    result = read_cache();
  } else {
    console.log("Fetch yuque posts from online...");
    const docsInfo = await fetch_from_online(slug);
    result = await parse_post(docsInfo);
    await cache_posts(result);
  }
  return result;
}

// get_yuque_post();
