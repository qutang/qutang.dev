import moment from "moment";

export default ({ data }) => (
  <section className="copyright-notice">
    <h3>Copyright notice</h3>
    <p>
      © {data.site.author} and{" "}
      <a href={"https://" + data.site.url}>{data.site.url}</a>, 2019-
      {moment().format("YYYY")}. Unauthorized use and/or duplication of this
      material without express and written permission from this site’s author
      and/or owner is strictly prohibited. Excerpts and links may be used,
      provided that full and clear credit is given to {data.site.author} and{" "}
      <a href={"https://" + data.site.url}>{data.site.url}</a> with appropriate
      and specific direction to the original content.
    </p>
  </section>
);
