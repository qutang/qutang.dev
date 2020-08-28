import { get_posts } from "../_posts.js";

export async function get(req, res) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { series } = req.params;

  const result = await get_posts();
  const serie_posts = await result.posts.filter(
    (post) => post.series == series
  );

  if (serie_posts.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(await JSON.stringify({ posts: serie_posts }));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
