import Shortcuts from "./shortcuts";
import Avatar from "./avatar";
import Footer from "./footer";
import Copyright from "./copyright";

export default ({ data, pageType }) => {
  return (
    <aside className="side-container">
      <Avatar avatar={data.site.avatar} />
      <Shortcuts shortcuts={data.shortcuts} pageType={pageType} />
      {pageType === "post" && <Copyright data={data} />}
      <Footer author={data.site.author} />
    </aside>
  );
};
