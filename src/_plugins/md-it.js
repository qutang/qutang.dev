const fm = require("front-matter");
const tm = require("markdown-it-texmath");
const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(require("markdown-it-iframe"), {
    allowfullscreen: true,
    width: 800,
    height: 480,
    frameborder: 0, // default: 0
    renderIframe: true, // default: true
  })
  .use(require("markdown-it-highlightjs"), { inline: true })
  .use(require("markdown-it-footnote"))
  .use(require("markdown-it-anchor"), {
    level: 2,
  })
  .use(require("markdown-it-toc-done-right"))
  .use(tm, {
    engine: require("katex"),
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  });

function customMarked(content) {
  let result = fm(content);
  content = result.body;
  let meta = result.attributes;
  let html = md.render(content);
  return { html, meta };
}

export { customMarked };
