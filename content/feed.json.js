import moment from "moment";
import { Feed } from "feed";
import fs from "fs";
import { renderToString } from "react-dom/server";
import React from "react";

var getContent = function(post, props) {
  if (post.meta.type === "ipynb") {
    return post.meta.ipynbContent;
  } else if (post.meta.type === "mdx") {
    return renderToString(React.createElement(post.component, props));
  }
};

export default props => {
  var siteUrl = "https://" + props.data.site.url;
  var feedJson = {
    title: props.data.site.title,
    description: props.data.site.description,
    id: siteUrl,
    link: siteUrl,
    language: "en-us",
    image: siteUrl + "/images/avatar.jpg",
    favicon: siteUrl + "/favicon.ico",
    copyright:
      "All rights reserved " +
      moment().format("YYYY") +
      ", " +
      props.data.site.author,
    generator: "awesome",
    feedLinks: {
      json: siteUrl + "/feed.json",
      atom: siteUrl + "/atom.xml",
      rss: siteUrl + "/rss.xml"
    },
    author: {
      name: props.data.site.author,
      link: siteUrl
    }
  };
  var posts = props.pages.filter(
    page =>
      page.path.includes("blog/") &&
      !page.path.includes("archive") &&
      !page.path.includes("series")
  );
  var feed = new Feed(feedJson);
  posts.forEach(post => {
    var content = getContent(post, props);
    var postUrl = siteUrl + post.path;
    feed.addItem({
      title: post.meta.title,
      id: postUrl,
      link: postUrl,
      description: post.meta.excerpt,
      content: content,
      author: [{ name: props.data.site.author }],
      date: moment(post.meta.date).toDate()
    });
  });
  feed.addCategory("Technologies");
  var rssStr = feed.rss2();
  var atomStr = feed.atom1();
  var jsonStr = feed.json1();
  if (props.environment === "development") {
    fs.writeFileSync("tmp/target/rss.xml", rssStr);
    fs.writeFileSync("tmp/target/atom.xml", atomStr);
  } else if (props.environment === "production") {
    fs.writeFileSync("public/rss.xml", rssStr);
    fs.writeFileSync("public/atom.xml", atomStr);
  }
  return JSON.parse(jsonStr);
};

var removeCavets = function(text) {
  return text.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
};
