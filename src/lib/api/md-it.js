import fm from "front-matter";
import tm from "markdown-it-texmath";
import mdit from "markdown-it";
import iframe from "markdown-it-iframe";
import hljs from "markdown-it-highlightjs";
import footnote from "markdown-it-footnote";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import katex from "katex";

const md = mdit({
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
})
  .use(iframe, {
    allowfullscreen: true,
    width: 800,
    height: 480,
    frameborder: 0, // default: 0
    renderIframe: true, // default: true
  })
  .use(hljs, { inline: false })
  .use(footnote)
  .use(anchor, {
    level: 2,
  })
  .use(toc)
  .use(tm, {
    engine: katex,
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

export default customMarked;
