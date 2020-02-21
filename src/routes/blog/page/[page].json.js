import blog from "../_posts.js";

const lookup = new Map();
blog.posts.forEach(post => {
  let pagePosts = lookup.get(post.page);
  if (pagePosts === undefined) {
    lookup.set(post.page, [post]);
  } else {
    pagePosts.push(post);
    lookup.set(post.page, pagePosts);
  }
});

export function get(req, res) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { page } = req.params;

  if (lookup.has(page)) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({ posts: lookup.get(page), totalPages: blog.totalPages })
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: `Not found`
      })
    );
  }
}
