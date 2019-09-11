import Shortcuts from "./shortcuts";
import Avatar from "./avatar";
import Footer from "./footer";
import Copyright from "./copyright";
import MenuControl from "./menu-control";

export default ({ data, pageType }) => {
  return (
    <aside className="side-container">
      <MenuControl />
      <div className="side-inner-container">
        <Avatar avatar={data.site.avatar} />
        <Shortcuts shortcuts={data.shortcuts} pageType={pageType} />
        {pageType === "post" && <Copyright data={data} />}
        <Footer data={data} />
      </div>
    </aside>
  );
};
