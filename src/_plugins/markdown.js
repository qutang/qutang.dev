


import hljs from 'highlight.js'
import katex from 'katex'
import { markdown, Renderer } from 'svelte-preprocess-markdown'

export function customMarkdown(options) {
    options = getCustomOptions(options);
    return markdown(options)
}

function getCustomOptions(options) {
    let renderer = Renderer();
    let originParagraph = renderer.paragraph.bind(renderer);

    renderer.paragraph = text => {
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
        return originParagraph(text);
    };
    options = {
        ...options,
        renderer: renderer,
        highlight: highlightCode
    }
    return options
}

const highlightCode = function (code, lang) {
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