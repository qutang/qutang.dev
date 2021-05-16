import { get_posts } from "$lib/Blog/_posts";

export async function get({ params }) {
  // the `page` parameter is available because
  // this file is called [page].json.js
  const { page } = params;

  const result = await get_posts();
  const page_posts = await result.posts.filter((post) => post.page === page);
  const totalPages = result.totalPages;

  if (page_posts.length > 0) {
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: { posts: page_posts, totalPages: totalPages }
    }
  }
}
