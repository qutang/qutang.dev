import TwoColumnLayout from "./layouts/two-column";
import BlogItem from "./components/blog-item";

export default props => {
  var posts = props.pages.filter(page => page.path.includes("blog/"));
  return (
    <TwoColumnLayout {...props} title="Blog" css="../css/blog.css">
      {posts.map(post => {
        return (
          <BlogItem post={post} key={post.path} />
        )
      })}
    </TwoColumnLayout>
  );
};
