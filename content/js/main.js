import jump from "jump.js";
import setupSidebar from "./sidebar";

const setupBackToTop = function () {
  const toComment = document.querySelector(".shortcut-comment");
  const toTop = document.querySelector(".shortcut-top");
  toTop.style.display = "none";
  toTop &&
    toTop.addEventListener("click", e => {
      e.preventDefault();
      jump(".layout-container", {
        duration: 1000
      });
    });
  toComment &&
    toComment.addEventListener("click", e => {
      jump("#comments", {
        duration: 1000
      });
    });

  window.onscroll = e => {
    if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
      if (toTop.style.display === "none") {
        toTop.style.display = "flex";
      }
    } else {
      toTop.style.display = "none";
    }
  };
};

document.addEventListener("DOMContentLoaded", function () {
  setupBackToTop();
  setupSidebar();
});
