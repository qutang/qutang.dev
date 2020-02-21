import hljs from "highlight.js";
import katex from "katex";
import { markdown, Renderer } from "svelte-preprocess-markdown";
import marked from "marked";
import fm from "front-matter";

export function customMarkdown(options) {
  options = getCustomOptions(options);
  return markdown(options);
}

export function customMarked(options, content, path) {
  let result = fm(content);
  content = result.body;
  let meta = result.attributes;
  options = getCustomOptions(options);
  marked.setOptions(options);
  let html = customParser(content, path, options);
  return { html, meta };
}

function customParser(content, path, options) {
  const tokens = marked.lexer(content);
  let refCounter = 0;
  let refMap = new Map();
  let footnotes = [];
  for (let i in tokens) {
    let result = parseReference(tokens[i].text, refCounter, refMap);
    if (result !== null) {
      tokens[i].text = result.text;
      refCounter = result.counter;
      refMap = result.refMap;
    }
    result = parseMath(tokens[i].text);
    if (result !== null) {
      tokens[i].text = result;
    }

    result = parseVideo(tokens[i].text);
    if (result !== null) {
      tokens[i].text = result;
    }
    result = parseFootnote(tokens[i].text, path);
    if (result !== null) {
      footnotes.push(result);
      tokens[i].text = "";
    }
  }
  let html = marked.parser(tokens, options);
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

function parseFootnote(text, path) {
  const footnoteTest = /^\[\^[^\]]+\]: /;
  const footnoteMatch = /^(\[\^[^\]]+\]): ([\s\S]*)$/;
  // get block tokens
  if (!footnoteTest.test(text)) {
    return null;
  }
  const match = text.match(footnoteMatch);
  let name = match[1]
    .replace("[", "")
    .replace("]", "")
    .replace("^", "")
    .replace(/\W/, "-");
  let note = match[2];

  note = `${note} [↩](${path}#ref-${name})`;

  let footnote = {
    name,
    note: `${marked(note)}`
  };
  return footnote;
}

function parseMath(text) {
  if (text === undefined) {
    return null;
  }
  const blockRegex = /\$\$[^\$]*\$\$/g;
  const inlineRegex = /\$[^\$]*\$/g;

  let blockExprArray = text.match(blockRegex);
  let inlineExprArray = text.match(inlineRegex);
  for (let i in blockExprArray) {
    const expr = blockExprArray[i];
    const result = renderMathsExpression(expr);
    text = text.replace(expr, result);
  }
  for (let i in inlineExprArray) {
    const expr = inlineExprArray[i];
    const result = renderMathsExpression(expr);
    text = text.replace(expr, result);
  }

  return text;
}

function parseReference(text, counter, refMap) {
  if (text === undefined) {
    return null;
  }
  const referenceTest = /\[\^([^\]]+)\](?!\()(?!:)/g;

  let referenceArray = text.match(referenceTest);

  for (let i in referenceArray) {
    const expr = referenceArray[i];
    let index = undefined;
    if (refMap.get(expr) !== undefined) {
      index = refMap.get(expr);
    } else {
      index = counter++;
      refMap.set(expr, index);
    }
    const result = renderReference(expr, index);
    text = text.replace(expr, result);
  }

  return { text, counter, refMap };
}

function parseVideo(text) {
  if (text === undefined) {
    return null;
  }
  if (text.startsWith("online_video")) {
    let url = text.split(" ")[1];
    if (url.includes("bilibili")) {
      let id = url.split("av")[1].split("?")[0];
      return `<iframe src="//player.bilibili.com/player.html?aid=${id}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  style="width: 640px; height: 360px; max-width: 100%; margin: 0 auto;"></iframe>`;
    } else if (url.includes("youtube")) {
      let id = url.split("v=")[1];
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
  }
  return null;
}

function getCustomOptions(options) {
  let renderer = Renderer();
  let originalCode = renderer.code.bind(renderer);
  renderer.code = function(code, language) {
    if (language == "mermaid") {
      return '<div class="mermaid">' + code + "</div>";
    } else {
      language = hljs.getLanguage(language) ? language : "plaintext";
      return `<pre><code class="language-${language}">${highlightCode(
        code,
        language
      )}</code></pre>`;
    }
  };
  options = {
    ...options,
    renderer: renderer,
    highlight: highlightCode,
    headerIds: true,
    langPrefix: "language-",
    headerPrefix: "",
    mangle: true,
    pedantic: false
  };
  return options;
}

const highlightCode = function(code, lang) {
  let language = hljs.getLanguage(lang) ? lang : "plaintext";
  let result = hljs.highlight(language, code).value;
  return result;
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
