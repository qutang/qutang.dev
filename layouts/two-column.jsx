import Head from "../components/head";
import Main from "../components/main";
import Side from "../components/side";
import MenuControl from "../components/menu-control";

export default ({ data, children, css, title, pageType, environment }) => (
  <html lang="en">
    <Head
      title={title}
      css={css}
      siteName={data.site.title}
      pageType={pageType}
    />
    <body>
      <div className="fixed-header">
        <MenuControl />
      </div>
      <div className="layout-container">
        <Side data={data} pageType={pageType}></Side>
        <Main data={data}>{children}</Main>
      </div>
    </body>
  </html>
);
