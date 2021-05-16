import { get_posts } from "$lib/Blog/_posts";

export async function get({ params }) {
  const result = await get_posts();
  const totalPages = result.totalPages;
  const posts = await result.posts.map((post) => {
    return {
      ...post,
    };
  });
  const contents = {
    posts: posts,
    totalPages: totalPages
  };

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: contents
  }
}
