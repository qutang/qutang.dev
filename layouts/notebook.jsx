import PostLayout from "./post";
import renderHTML from "react-render-html";
import Link from "../components/link";
import readtime from "../components/read-time";

var Notebook = ({ url, meta, children }) => {
  var nbviewerLink =
    "https://nbviewer.jupyter.org/url/" + url + "/blog/" + meta.ipynbFile;
  return (
    <>
      <span className="badge">
        <Link to={nbviewerLink}>
          <img src="../icons/nbviewer.svg" alt="nbviewer" />
        </Link>
      </span>
      {children}
    </>
  );
};

export default ({ meta, ...props }) => {
  meta["readTime"] = readtime.getReadTime(meta.ipynbContent);
  return (
    <PostLayout {...props} meta={meta}>
      {props.children}
      <Notebook url={props.data.site.url} meta={meta}>
        {renderHTML(meta.ipynbContent)}
      </Notebook>
    </PostLayout>
  );
};
