import TwoColumnLayout from "./two-column";
import moment from "moment";
import Link from "../components/link";
import ReactDOMServer from "react-dom/server";
import readtime from "../components/read-time";
import seriesFunctions from "../components/series";
import Ad from "../components/ad";

export default ({ meta, hideAd, ...props }) => {
  if (meta.type !== "ipynb" && meta.markdownContent === undefined) {
    meta["readTime"] = readtime.getReadTime(
      ReactDOMServer.renderToStaticMarkup(props.children)
    );
  }
  return (
    <TwoColumnLayout
      {...props}
      title={meta.title}
      css="../css/post.css"
      pageType="post"
      description={meta.excerpt + " " + props.data.site.description}
    >
      <h2 style={{height: 0, overflow: "hidden", margin: 0, padding: 0}} id='top'>☝️ Back to top</h2>
      <header>
        <h1 className='toc-ignore'>{meta.title + (meta.draft ? "(draft)" : "")}</h1>
      </header>
      <section className="post-meta-container">
        {meta.series && (
          <span className="post-meta-series">
            <Link to={"/blog/series#" + (meta.series || "")}>
              {seriesFunctions.getSeriesName(meta.series, props.data) || ""}
            </Link>
            {" | "}
          </span>
        )}
        <span className="post-meta-readtime">
          {meta.readTime + " min"}
          {" | "}
        </span>
        <time className="post-meta-date">
          <Link to={"/blog/archive#" + moment(meta.date).format("YYYY")}>
            {moment(meta.date).format("MMM DD, YYYY")}
          </Link>
        </time>
      </section>
      <article>
        {!hideAd && <Ad width="250px" height="200px" float="right" leftGap="5px" />}
        {props.children}
      </article>
      <section className="post-comment-container">
        <h2 id="comments">Comments</h2>
        <div id="gitalk-container"></div>
      </section>
    </TwoColumnLayout>
  );
};
