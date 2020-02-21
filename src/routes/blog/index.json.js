import blog from "./_posts.js";

const contents = JSON.stringify({
  posts: blog.posts.map(post => {
    return {
      ...post
    };
  }),
  totalPages: blog.totalPages
});

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(contents);
}
