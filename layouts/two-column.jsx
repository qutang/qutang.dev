import Head from "../components/head";
import Main from "../components/main";
import LeftSide from "../components/left-side";
import RightSide from "../components/right-side";
import MenuControl from "../components/menu-control";

export default ({ data, children, css, title, pageType, description, pagination, environment }) => (
  <html lang="en">
    <Head
      title={title}
      css={css}
      siteName={data.site.title}
      pageType={pageType}
      description={description}
    />
    <body>
      <div className="fixed-header">
        <MenuControl />
      </div>
      <div className="layout-container">
        <LeftSide data={data} pageType={pageType}></LeftSide>
        <Main data={data} pagination={pagination}>{children}</Main>
        <RightSide />
      </div>
    </body>
  </html>
);
