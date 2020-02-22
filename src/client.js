import * as sapper from "@sapper/app";

sapper
  .start({
    target: document.querySelector("#sapper")
  })
  .then(() => {
    console.log("client-side app has started");
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
    var oldHref = document.location.href;
    var oldLang = document.querySelector('.language').textContent;
    var bodyList = document.querySelector("body"),
      observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (oldHref != document.location.href) {
            oldHref = document.location.href;
            mermaid.init(undefined, document.querySelectorAll(".mermaid"));
          }
          if (oldLang != document.querySelector('.language').textContent) {
            oldLang = document.querySelector('.language').textContent;
            mermaid.init(undefined, document.querySelectorAll(".mermaid"));
          }
        });
      });

    var config = {
      childList: true,
      subtree: true
    };

    observer.observe(bodyList, config);
  });
