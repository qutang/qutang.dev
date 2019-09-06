import Head from "../components/head";
import Main from "../components/main";
import Side from "../components/side";

export default ({ data, children, css, title, pageType, environment }) => (
  <html lang="en">
    <Head title={title} css={css} siteName={data.site.title} pageType={pageType} />
    <body>
      <div className="layout-container">
        <Main data={data}>{children}</Main>
        <Side data={data} pageType={pageType}></Side>
      </div>
    </body>
  </html>
);
