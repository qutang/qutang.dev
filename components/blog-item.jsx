import Link from "./link";
import moment from "moment";

export default ({ post }) => (
  <section className="blog-item-container">
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
      <time className="blog-item-date">
        <a href={"/blog/archive#" + moment(post.meta.date).format("YYYY")}>
          {moment(post.meta.date).format("MMM DD, YYYY")}
        </a>
      </time>
    </footer>
  </section>
);
