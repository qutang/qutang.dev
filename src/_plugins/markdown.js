import hljs from "highlight.js";
import katex from "katex";
import { markdown, Renderer } from "svelte-preprocess-markdown";
import marked from "marked";

export function customMarkdown(options) {
  options = getCustomOptions(options);
  return markdown(options);
}

export function customMarked(options, content, path) {
  options = getCustomOptions(options);
  marked.setOptions(options);
  let footnotes = parseFootnotes(content, path);
  let html = marked(content);

  // add footnotes back to html
  html = html.replace(/#bib/g, `${path}#bib`);
  if (footnotes.length > 0) {
    footnotes = footnotes.map(f => `<li id="bib-${f.name}">${f.note}</li>`);
    html += `
<hr />
<ol>
  ${footnotes.join("")}
</ol>
`;
  }
  return html;
}

function parseFootnotes(content, path) {
  const footnotes = [];
  const footnoteTest = /^\[\^[^\]]+\]: /;
  const footnoteMatch = /^(\[\^[^\]]+\]): ([\s\S]*)$/;
  // get block tokens
  const tokens = marked.lexer(content);

  // remove footnotes from tokens

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== "paragraph" || !footnoteTest.test(tokens[i].text)) {
      continue;
    }
    console.log(tokens[i].text.length);

    const match = tokens[i].text.match(footnoteMatch);
    let name = match[1]
      .replace("[", "")
      .replace("]", "")
      .replace("^", "")
      .replace(/\W/, "-");
    let note = match[2];

    // multiline notes will be considered indented code blocks
    if (
      i + 2 < tokens.length &&
      tokens[i + 2].type === "code" &&
      tokens[i + 2].codeBlockStyle === "indented"
    ) {
      note += "\n\n" + tokens[i + 2].text;
      i += 2;
    }

    footnotes.push({
      name,
      note: `${marked(note)} <a href="${path}#ref-${name}">↩</a>`
    });
  }
  return footnotes;
}

function getCustomOptions(options) {
  let renderer = Renderer();
  let originParagraph = renderer.paragraph.bind(renderer);
  let counter = 0;
  renderer.paragraph = text => {
    const blockRegex = /\$\$[^\$]*\$\$/g;
    const inlineRegex = /\$[^\$]*\$/g;
    const referenceTest = /\[\^([^\]]+)\](?!\()(?!:)/g;
    const footnoteMatch = /^\[\^([^\]]+)\]: ([\s\S]*)$/;

    let blockExprArray = text.match(blockRegex);
    let inlineExprArray = text.match(inlineRegex);
    let referenceArray = text.match(referenceTest);
    let bibArray = text.match(footnoteMatch);

    for (let i in blockExprArray) {
      const expr = blockExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
    for (let i in inlineExprArray) {
      const expr = inlineExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr[0], result);
    }
    for (let i in referenceArray) {
      const expr = referenceArray[i];
      const result = renderReference(expr, counter++);
      text = text.replace(expr, result);
    }

    for (let i in bibArray) {
      const expr = bibArray[i];
      text = text.replace(expr, "");
    }

    return originParagraph(text);
  };
  options = {
    ...options,
    renderer: renderer,
    highlight: highlightCode
  };
  return options;
}

const highlightCode = function(code, lang) {
  let language = hljs.getLanguage(lang) ? lang : "plaintext";
  return hljs.highlight(language, code).value;
};

function renderMathsExpression(expr) {
  if (expr[0] === "$" && expr[expr.length - 1] === "$") {
    let displayStyle = false;
    expr = expr.substr(1, expr.length - 2);
    if (expr[0] === "$" && expr[expr.length - 1] === "$") {
      displayStyle = true;
      expr = expr.substr(1, expr.length - 2);
    }
    let html = null;
    try {
      html = katex.renderToString(expr);
    } catch (e) {
      // console.err(e);
    }
    if (displayStyle && html) {
      html = html.replace(
        /class="katex"/g,
        'class="katex katex-block" style="display: block;"'
      );
    }
    return html;
  } else {
    return null;
  }
}

function renderReference(expr, i) {
  let name = expr
    .replace("[", "")
    .replace("]", "")
    .replace("^", "")
    .replace(/\W/, "-");
  return `<mark id='ref-${name}'><a href="#bib-${name}">[${i + 1}]</a></mark>`;
}

function renderBibArray(expr, refMap) {
  // console.log(expr);
  return expr;
}
