import TwoColumnLayout from "./two-column";
import moment from "moment";

import Link from "../components/link";
export default ({ meta, ...props }) => (
  <TwoColumnLayout
    {...props}
    title={meta.title}
    css="../css/post.css"
    pageType="post"
  >
    <header>
      <h2>{meta.title}</h2>
    </header>
    <section className="post-meta-container">
      {meta.series && (
        <span className="post-meta-series">
          <Link to={"/blog/series#" + meta.series || ""}>
            {meta.series || ""}
          </Link>
          {" | "}
        </span>
      )}
      <time className="post-meta-date">
        <Link to={"/blog/archive#" + moment(meta.date).format("YYYY")}>
          {moment(meta.date).format("MMM DD, YYYY")}
        </Link>
      </time>
    </section>
    <article>{props.children}</article>
    <section class="post-comment-container">
      <h2 id="comments">Comments</h2>
      <div id="gitalk-container"></div>
    </section>
  </TwoColumnLayout>
);
