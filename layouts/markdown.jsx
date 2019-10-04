import PostLayout from "./post";
import renderHTML from "react-render-html";
import readtime from "../components/read-time";

export default ({ meta, ...props }) => {
  meta["readTime"] = readtime.getReadTime(meta.markdownContent);
  return (
    <PostLayout {...props} meta={meta}>
      {renderHTML(meta.markdownContent)}
      {props.children}
    </PostLayout>
  );
};
