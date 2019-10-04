import Link from "./link";
import moment from "moment";
import readtime from "./read-time";
import seriesFunctions from "./series";
import ReactDOMServer from "react-dom/server";

export default ({ post, data }) => {
  var readTime = 0;
  if (post.meta.type === "ipynb") {
    readTime = readtime.getReadTime(post.meta.ipynbContent);
  } else if (post.meta.markdownContent !== undefined) {
    readTime = readtime.getReadTime(post.meta.markdownContent);
  } else if (post.meta.type === "mdx") {
    readTime = readtime.getReadTime(
      ReactDOMServer.renderToStaticMarkup(React.createElement(post.component))
    );
  }

  var layoutClassName = post.meta.layout === "half" ? "half-column" : "";

  return (
    <section className={"blog-item-container" + " " + layoutClassName}>
      <header className="blog-item-header-container">
        <h2>
          <Link to={post.path}>
            {post.meta.title + (post.meta.draft ? "(draft)" : "")}
          </Link>
        </h2>
      </header>
      <section className="blog-item-description-container">
        <p className="blog-item-first-letter">
          {post.meta.excerpt.slice(0, 1)}
        </p>
        <p className="blog-item-description">{post.meta.excerpt.slice(1)}</p>
      </section>
      <footer className="blog-item-footer-container">
        {post.meta.series && (
          <span className="blog-item-series">
            <a href={"/blog/series#" + post.meta.series || ""}>
              {seriesFunctions.getSeriesName(post.meta.series, data) || ""}
            </a>{" "}
            {" | "}
          </span>
        )}
        <span className="blog-item-readtime">
          {readTime + " min"}
          {" | "}
        </span>
        <time className="blog-item-date">
          <a href={"/blog/archive#" + moment(post.meta.date).format("YYYY")}>
            {moment(post.meta.date).format("MMM DD, YYYY")}
          </a>
        </time>
      </footer>
    </section>
  );
};
