import { get_posts } from "$lib/Blog/_posts";

export async function get({ params }) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { series } = params;

  const result = await get_posts();
  const serie_posts = result.posts.filter(
    (post) => post.series == series
  );

  if (serie_posts.length > 0) {
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: { posts: serie_posts }
    }
  }
}
