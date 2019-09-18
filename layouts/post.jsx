import TwoColumnLayout from "./two-column";
import moment from "moment";
import Link from "../components/link";
import ReactDOMServer from 'react-dom/server';
import getReadTime from '../components/read-time';
import seriesFunctions from '../components/series';

export default ({ meta, ...props }) => {
  if (meta.type !== 'ipynb') {
    meta['readTime'] = getReadTime(ReactDOMServer.renderToStaticMarkup(props.children));
  }
  return (<TwoColumnLayout
    {...props}
    title={meta.title}
    css="../css/post.css"
    pageType="post"
    description={meta.excerpt + " " + props.data.site.description}
  >
    <header>
      <h2>{meta.title + (meta.draft ? "(draft)" : "")}</h2>
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
      <span className='post-meta-readtime'>{meta.readTime + ' min'}{" | "}</span>
      <time className="post-meta-date">
        <Link to={"/blog/archive#" + moment(meta.date).format("YYYY")}>
          {moment(meta.date).format("MMM DD, YYYY")}
        </Link>
      </time>
    </section>
    <article>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1246737870300549"
        data-ad-slot="5669809671"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      {props.children}
    </article>
    <section className="post-comment-container">
      <h2 id="comments">Comments</h2>
      <div id="gitalk-container"></div>
    </section>
  </TwoColumnLayout>)
};
