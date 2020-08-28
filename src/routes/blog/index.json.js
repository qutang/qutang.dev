import { get_posts } from "./_posts.js";

export async function get(req, res) {
  const result = await get_posts();
  const posts = result.posts;
  const totalPages = result.totalPages;

  const contents = await JSON.stringify({
    posts: posts.map((post) => {
      return {
        ...post,
      };
    }),
    totalPages: totalPages,
  });
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
