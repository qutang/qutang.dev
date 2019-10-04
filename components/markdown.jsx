import remark from 'remark'
import remarkHtml from 'remark-html'
import fs from "fs";
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkHtmlKatex from 'remark-html-katex';

// import Prism from "prismjs";
// import loadLanguages from "prismjs/components/";

var parseFile = function (file) {
    var absPath = "content/blog/" + file;
    var mdRaw = fs.readFileSync(absPath);
    var finalHTML = remark()
        .use(remarkParse, {
            footnotes: true,
            pedantic: true
        })
        .use(remarkMath)
        .use(remarkHtmlKatex)
        .use(remarkHtml)
        .processSync(mdRaw)
        .toString();
    return finalHTML;
};

export default parseFile;
