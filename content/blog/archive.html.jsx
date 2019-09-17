import TwoColumnLayout from "../../layouts/two-column";
import moment from "moment";

export const meta = {
  type: "jsx"
};

var getYears = function(posts) {
  var years = posts
    .map(post => parseInt(moment(post.meta.date).format("YYYY")))
    .filter((name, index, arr) => arr.indexOf(name) === index)
    .sort((prev, next) => prev <= next);
  return years;
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
  var years = getYears(posts);

  var sortedPosts = posts.sort((prev, next) =>
    moment(prev.meta.date).isBefore(next.meta.date)
  );

  return (
    <TwoColumnLayout
      {...props}
      title="Blog"
      css="../css/archive.css"
      pageType="archive"
    >
      {years.map(year => {
        var yearPosts = sortedPosts.filter(
          post => parseInt(moment(post.meta.date).format("YYYY")) === year
        );
        var blogItems = yearPosts.map(post => {
          return (
            <div className="archive-item-container" key={post.path}>
              <time className="archive-item-date">
                {moment(post.meta.date).format("MMM DD, YYYY")}
              </time>
              {"-"}
              <h3 className="archive-item-title">
                <a href={post.path}>{post.meta.title}</a>
              </h3>
              <span className="archive-item-series">
                <a href={"/blog/series#" + post.meta.series}>
                  {post.meta.series}
                </a>
              </span>
            </div>
          );
        });
        return (
          <section className="archive-section-container" key={year}>
            <h2 id={year} className="archive-section-title">
              {year} ({yearPosts.length})
            </h2>
            {blogItems}
          </section>
        );
      })}
    </TwoColumnLayout>
  );
};
