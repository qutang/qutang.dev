import moment from "moment";
import ChargeIcon from "../content/icons/charge.js.svg";
import RssIcon from '../content/icons/rss.svg';
import SitemapIcon from '../content/icons/sitemap.svg';
import Link from "./link";
export default ({ data }) => (
  <footer className="footer-container">
    <small>
      {data.site.author} © {moment().format("YYYY")} |{" "}
      <Link className="footer-feed-link" to={data.site.rss}><RssIcon /> Feeds</Link> |{" "}
      <Link className="footer-sitemap-link" to={data.site.sitemap}><SitemapIcon /> Sitemap</Link>
    </small>
    <small>
      Powered by{" "}
      <Link to="https://charge.js.org">
        <ChargeIcon /> Charge.js
      </Link>{" "}
    </small>
  </footer>
);
