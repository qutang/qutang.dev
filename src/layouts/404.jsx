import Head from "../components/head";
import Main from "../components/main";
import Side from "../components/side";

export default ({ data, children, css, title, environment }) => (
  <html lang="en">
    <Head title={title} css={css} siteName={data.site.title} />
    <body>
      <div className="layout-container">
        <Main data={data}>{children}</Main>
        <Side data={data}></Side>
      </div>
    </body>
  </html>
);
