import TwoColumnLayout from "../layouts/two-column";
import BlogItem from "../components/blog-item";
import moment from "moment";

export const meta = {
  type: "jsx"
};

export default props => {
  var posts = props.pages.filter(page => {
    var isDraft = page.meta.draft && props.environment === "production";
    return (
      page.path.includes("blog/") &&
      !page.path.includes("blog/series") &&
      !page.path.includes("blog/archive") &&
      !isDraft
    );
  });
  var sortedPosts = posts.sort((prev, next) =>
    moment(prev.meta.date).isBefore(next.meta.date)
  );

  var lastHalfPostIndex = -2;
  var sortedPosts = sortedPosts.map((post, index) => {
    var count = post.meta.excerpt.length;
    if (index == lastHalfPostIndex + 1) {
      post.meta["excerpt"] = post.meta["excerpt"].slice(0, 100) + "...";
      post.meta["layout"] = "half";
      lastHalfPostIndex = -2;
    } else if (count < 100) {
      post.meta["layout"] = "half";
      lastHalfPostIndex = index;
    }
    return post;
  });
  return (
    <TwoColumnLayout
      {...props}
      title="Blog"
      css="../css/blog.css"
      pageType="blog"
      description={
        "Latest articles from Qu Tang. " + props.data.site.description
      }
    >
      {sortedPosts.map(post => {
        return <BlogItem post={post} key={post.path} data={props.data} />;
      })}
    </TwoColumnLayout>
  );
};
