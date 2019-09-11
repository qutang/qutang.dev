const isSidebarShown = function() {
  return (
    getComputedStyle(document.querySelector(".side-container"), null)
      .display !== "none"
  );
};

const isFullSidebar = function() {
  return document.querySelector(".side-container").offsetWidth > 200;
};

const isLargeDevice = function() {
  return window.innerWidth >= 1120;
};

const isMobileDevice = function() {
  return window.innerWidth < 925;
};

const collapseSidebar = function() {
  document.querySelector(".side-container").style.width = "85px";
  document.querySelector(".footer-container").style.display = "none";
  document.querySelector(".copyright-notice").style.display = "none";
};

const restoreSidebar = function() {
  document.querySelector(".side-container").removeAttribute("style");
  document.querySelector(".footer-container").removeAttribute("style");
  const el = document.querySelector(".copyright-notice");
  if (el !== null) el.removeAttribute("style");
};

const openSidebar = function() {
  document.querySelector(".side-container").style.display = "block";
  document.querySelector(".side-container").style.width = "280px";
  document.querySelector(".footer-container").style.display = "block";
  const el = document.querySelector(".copyright-notice");
  if (el !== null) el.style.display = "block";
};

const fixSidebar = function() {
  const el = document.querySelector(".side-container").style;
  el.position = "fixed";
  el.top = "0";
  el.left = "0";
};

const setupSidebarControl = function() {
  const sidebarControls = document.querySelectorAll(".side-menu-icon");
  console.log(sidebarControls.length);
  sidebarControls.forEach(el =>
    el.addEventListener("click", e => {
      e.preventDefault();
      if (isMobileDevice()) {
        if (isSidebarShown()) {
          restoreSidebar();
        } else {
          openSidebar();
          fixSidebar();
        }
      } else if (isLargeDevice()) {
        if (isFullSidebar()) {
          collapseSidebar();
        } else {
          restoreSidebar();
        }
      } else {
        if (isFullSidebar()) {
          restoreSidebar();
        } else {
          openSidebar();
          fixSidebar();
        }
      }
    })
  );
};

export default setupSidebarControl;
