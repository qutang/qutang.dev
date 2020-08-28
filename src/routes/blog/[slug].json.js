import { get_posts } from "./_posts.js";

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;
  const result = await get_posts();
  const posts = result.posts;
  // filter
  const slug_post = await posts.filter((post) => post.slug == slug);

  if (slug_post.length > 0) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(slug_post[0]));
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
