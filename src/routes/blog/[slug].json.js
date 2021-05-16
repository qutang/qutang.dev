import { get_posts } from "$lib/Blog/_posts";

export async function get({ params }) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = params;
  const result = await get_posts(slug);
  const posts = result.posts;
  // filter
  const slug_post = await posts.filter((post) => post.slug == slug);
  const content = { post: slug_post[0] };

  if (slug_post.length > 0) {
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: content
    }
  }
}
