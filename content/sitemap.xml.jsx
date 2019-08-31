import fs from "fs";
import moment from "moment";

var getLastModTime = function(page) {
  var filePath = null;
  var pagePath = page.path === "/" ? "/index" : page.path;
  switch (page.meta.type) {
    case "mdx":
      filePath = "./content/" + pagePath + ".html.mdx";
      break;
    case "jsx":
      filePath = "./content/" + pagePath + ".html.jsx";
      break;
    case "ipynb":
      filePath = "./content/" + pagePath + "/index.ipynb";
      break;
  }
  return fs.statSync(filePath).mtime;
};

export default props => {
  var pages = props.pages.filter(page => !page.path.includes("xml"));
  var rootUrl = props.data.site.url;
  return (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {pages.map(page => {
        var lastModTime = getLastModTime(page);
        return (
          <url key={page.path}>
            <loc>{"https://" + rootUrl + page.path}</loc>
            <lastmod>{moment(lastModTime).format("YYYY-MM-DD")}</lastmod>
            <changefreq>weekly</changefreq>
          </url>
        );
      })}
    </urlset>
  );
};
