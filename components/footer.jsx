import moment from "moment";
import ChargeIcon from "../content/icons/charge.js.svg";
import Link from "./link";
export default ({ author }) => (
  <footer className="footer-container">
    <small>
      {author} © {moment().format("YYYY")} |{" "}
      <Link to="/sitemap.xml">Sitemap</Link>
    </small>
    <small>
      Powered by{" "}
      <Link to="https://charge.js.org">
        <ChargeIcon /> Charge.js
      </Link>{" "}
    </small>
  </footer>
);
