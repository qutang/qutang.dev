import * as sapper from "@sapper/app";

sapper
  .start({
    target: document.querySelector("#sapper"),
  })
  .then(() => {
    console.log("client-side app has started");
    var oldHref = document.location.href;
    console.log(oldHref);
    var oldLang = document.querySelector(".language").textContent;

    var bodyList = document.querySelector("body"),
      observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          console.log(document.location.href);
          if (oldHref !== document.location.href) {
            console.log("page changes end...");
            oldHref = document.location.href;
          }
          if (oldLang != document.querySelector(".language").textContent) {
            oldLang = document.querySelector(".language").textContent;
          }
        });
      });

    var config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  });
