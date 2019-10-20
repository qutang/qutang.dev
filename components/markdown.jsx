import remark from 'remark'
import remarkHtml from 'remark-html'
import fs from "fs";
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkHtmlKatex from 'remark-html-katex';
import remarkSlug from 'remark-slug';

// import Prism from "prismjs";
// import loadLanguages from "prismjs/components/";

var parseFile = function (file) {
    var absPath = "content/markdown/" + file;
    var mdRaw = fs.readFileSync(absPath);
    var finalHTML = remark()
        .use(remarkParse, {
            footnotes: true,
            pedantic: true
        })
        .use(remarkSlug)
        .use(remarkMath)
        .use(remarkHtmlKatex)
        .use(remarkHtml)
        .processSync(mdRaw)
        .toString();
    return finalHTML;
};

export default parseFile;
