import { get_posts } from "$lib/blog/_posts.js";
const siteUrl = "https://qutang.dev";
const renderXmlRssFeed = async (
  posts
) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
    <title><![CDATA[Qu Tang's Blog]]></title>
    <link>${siteUrl}</link>
  <description><![CDATA[Developer or researcher? Sort of the mixture.]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
        <url>${siteUrl}/media/uploads/avatar.jpg</url>
        <title><![CDATA[Qu Tang's blog]]></title>
        <link>${siteUrl}/blog</link>
    </image>
    ${posts
      .map(
        (post) => `
        <item>
            <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="false">${siteUrl}/blog/${post.slug}</guid>
            <description><![CDATA[${post.excerpt}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
    `
      )
      .join("\n")}
</channel>
</rss>`;

export async function get({ params }) {
  const headers = {
    "Cache-Control": `max-age=0, s-max-age=${600}`, // 10 minutes
    "Content-Type": "application/rss+xml; charset=utf-8",
  };
  let result = await get_posts();
  const feed = await renderXmlRssFeed(result.posts);
  return {
    status: 200,
    headers: headers,
    body: feed
  }
}
