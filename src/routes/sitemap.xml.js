import { get_posts } from "./blog/_posts.js";

const siteUrl = "https://qutang.dev";
const renderSitemapXml = async (
  contextPaths
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${contextPaths
  .map(
    (path) => `
  <url>
    <loc>${siteUrl}/${path}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
`
  )
  .join("\n")}
</urlset>`;

export async function get(req, res) {
  res.writeHead(200, {
    "Cache-Control": `public, max-age=0, must-revalidate`,
    "Content-Type": "application/xml",
  });

  let result = await get_posts();
  const posts = await result.posts.map((post) => "blog/" + post.slug);
  const feed = await renderSitemapXml([...posts, "about", ""]);
  res.end(feed);
}
