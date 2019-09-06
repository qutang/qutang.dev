import Link from "./link";
import moment from "moment";
import getReadTime from './read-time'
import ReactDOMServer from 'react-dom/server'

export default ({ post }) => {
  var readTime = 0;
  if (post.meta.type === 'ipynb') {
    readTime = getReadTime(post.meta.ipynbContent);
  } else if (post.meta.type === 'mdx') {
    readTime = getReadTime(ReactDOMServer.renderToStaticMarkup(React.createElement(post.component)))
  }

  return (<section className="blog-item-container">
    <header className="blog-item-header-container">
      <h2>
        <Link to={post.path}>{post.meta.title}</Link>
      </h2>
    </header>
    <section className="blog-item-description-container">
      <p className="blog-item-first-letter">{post.meta.excerpt.slice(0, 1)}</p>
      <p className="blog-item-description">{post.meta.excerpt.slice(1)}</p>
    </section>
    <footer className="blog-item-footer-container">
      {post.meta.series && (
        <span className="blog-item-series">
          <a href={"/blog/series#" + post.meta.series || ""}>
            {post.meta.series || ""}
          </a>{" "}
          {" | "}
        </span>
      )}
      <span className="blog-item-readtime">
        {readTime + ' min'}{" | "}
      </span>
      <time className="blog-item-date">
        <a href={"/blog/archive#" + moment(post.meta.date).format("YYYY")}>
          {moment(post.meta.date).format("MMM DD, YYYY")}
        </a>
      </time>
    </footer>
  </section>)
};
