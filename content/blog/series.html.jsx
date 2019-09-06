import TwoColumnLayout from "../../layouts/two-column";
import moment from "moment";

export const meta = {
  type: "jsx"
};

var getSeries = function (posts) {
  var seriesNames = posts
    .map(post => post.meta.series)
    .filter(
      (name, index, arr) =>
        arr.indexOf(name) === index &&
        name !== null &&
        name !== "" &&
        name !== undefined
    );
  return seriesNames;
};

export default props => {
  var posts = props.pages.filter(
    page =>
      page.path.includes("blog/") &&
      !page.path.includes("blog/series") &&
      !page.path.includes("blog/archive")
  );
  var seriesNames = getSeries(posts);

  var sortedPosts = posts.sort((prev, next) =>
    moment(prev.meta.date).isBefore(next.meta.date)
  );

  return (
    <TwoColumnLayout {...props} title="Blog" css="../css/archive.css" pageType='archive'>
      {seriesNames.map(name => {
        var seriesPosts = sortedPosts.filter(post => post.meta.series === name);
        var blogItems = seriesPosts.map(post => {
          return (
            <div className="archive-item-container" key={post.path}>
              <time className="archive-item-date">
                <a
                  href={
                    "/blog/archive#" + moment(post.meta.date).format("YYYY")
                  }
                >
                  {moment(post.meta.date).format("MMM DD, YYYY")}
                </a>
              </time>
              {"-"}
              <h3 className="archive-item-title">
                <a href={post.path}>{post.meta.title}</a>
              </h3>
            </div>
          );
        });
        return (
          <section className="archive-section-container" key={name}>
            <h2 id={name} className="archive-section-title">
              {name} ({seriesPosts.length})
            </h2>
            {blogItems}
          </section>
        );
      })}
    </TwoColumnLayout>
  );
};
