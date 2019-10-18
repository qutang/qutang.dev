import Head from "../components/head";
import Main from "../components/main";
import Side from "../components/left-side";
import Ad from "../components/ad";

export default ({ data, children, css, title, pageType, description, environment }) => (
  <html lang="en">
    <Head title={title} css={css} siteName={data.site.title} pageType={pageType} description={description} />
    <body>
      <div className="layout-container">
        <Main data={data}>
          <Ad width='100%' height='100px' float='none' leftGap='0' />
          {children}
        </Main>
        <Side data={data} pageType={pageType}></Side>
      </div>
    </body>
  </html>
);
