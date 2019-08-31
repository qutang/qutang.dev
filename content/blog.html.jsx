import TwoColumnLayout from "../layouts/two-column";
import BlogItem from "../components/blog-item";
import moment from "moment";

export const meta = {
  type: "jsx"
};

export default props => {
  var posts = props.pages.filter(
    page =>
      page.path.includes("blog/") &&
      !page.path.includes("blog/series") &&
      !page.path.includes("blog/archive")
  );
  var sortedPosts = posts.sort((prev, next) =>
    moment(prev.meta.date).isBefore(next.meta.date)
  );
  return (
    <TwoColumnLayout {...props} title="Blog" css="../css/blog.css">
      {sortedPosts.map(post => {
        return <BlogItem post={post} key={post.path} />;
      })}
    </TwoColumnLayout>
  );
};
