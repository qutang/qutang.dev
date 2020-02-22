import blog from "../_posts.js";

const lookup = new Map();
blog.posts.forEach(post => {
  let seriesPosts = lookup.get(post.series);
  if (seriesPosts === undefined) {
    lookup.set(post.series, [post]);
  } else {
    seriesPosts.push(post);
    lookup.set(post.series, seriesPosts);
  }
});

export function get(req, res) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { series } = req.params;

  if (lookup.has(series)) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({ posts: lookup.get(series) }));
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
