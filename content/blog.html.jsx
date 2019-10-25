import TwoColumnLayout from "../layouts/two-column";
import BlogItem from "../components/blog-item";
import Pagination from "../components/pagination";
import moment from "moment";
import { renderToString } from "react-dom/server";
import fse from 'fs-extra';

export const meta = {
  type: "jsx"
};

var PageContent = ({ posts, pageIndex, totalPages, ...props }) => {
  console.log(totalPages)
  var nextPage = pageIndex + 2 <= totalPages + 1 ? ('/blog/' + (pageIndex + 2)) : undefined;
  var previousPage = pageIndex > 1 ? ('/blog/' + pageIndex) : (pageIndex == 1 ? '/blog' : undefined);
  return <TwoColumnLayout
    {...props}
    title={"Blog" + (pageIndex > 0 ? "-" + (pageIndex + 1) : "")}
    css="../css/blog.css"
    pageType="blog"
    description={
      "Latest articles from Qu Tang. " + props.data.site.description
    }
    pagination={<Pagination next={nextPage} previous={previousPage} />}
  >
    {posts.map(post => {
      return <BlogItem post={post} key={post.path} data={props.data} />;
    })}
  </TwoColumnLayout>
};

var generateBlogPage = (posts, pageIndex, totalPages, props) => {
  var newProps = { ...props, posts, pageIndex, totalPages };
  var htmlString = renderToString(React.createElement(PageContent, newProps));
  if (props.environment === "development") {
    var dest = "tmp/target/blog/" + (pageIndex + 1) + '.html';
    console.log("Generating blog pages: " + dest);
    fse.outputFileSync(dest, htmlString);
  } else if (props.environment === "production") {
    var dest = "public/blog/" + (pageIndex + 1) + '.html';
    console.log("Generating blog pages: " + dest);
    fse.outputFileSync(dest, htmlString);
  }
}

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
  var sortedPosts = posts.sort((prev, next) => {
    var prevBeforeNext = moment(prev.meta.date).isBefore(next.meta.date)
    if (prevBeforeNext) {
      return 1
    } else {
      return -1
    }
  });

  var lastHalfPostIndex = -2;
  var currentPage = 0;
  var currentRowPerPage = 0;
  var sortedPosts = sortedPosts.map((post, index) => {
    if (currentRowPerPage == 3) {
      currentRowPerPage = 0;
      currentPage++;
    }
    var count = post.meta.excerpt.length;
    post.meta["page"] = currentPage;
    if (index == lastHalfPostIndex + 1) {
      post.meta["excerpt"] = post.meta["excerpt"].slice(0, 100) + "...";
      post.meta["layout"] = "right-half";
      lastHalfPostIndex = -2;
      currentRowPerPage++;
    } else if (count < 100) {
      post.meta["layout"] = "left-half";
      lastHalfPostIndex = index;
    } else {
      currentRowPerPage++;
    }
    return post;
  });

  // generating pages after the first page
  for (var i = 1; i <= currentPage; i++) {
    var postsOnPage = sortedPosts.filter((post) => post.meta['page'] == i);
    generateBlogPage(postsOnPage, i, currentPage, props);
  }

  // get posts for the first page
  var postsOnFirstPage = sortedPosts.filter((post) => post.meta['page'] == 0)

  return <PageContent posts={postsOnFirstPage} pageIndex={0} totalPages={currentPage} {...props} />;
};
