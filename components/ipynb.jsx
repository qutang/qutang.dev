import nb from 'notebookjs'
import fs from 'fs'
import renderHTML from 'react-render-html'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/'
import katex from 'katex'
import Link from './link'


var renderWithDelimitersToString = function (text) {
    var CleanAndRender = function (str) {
        var mathText = str.replace(/\\\(|\$\$|\\\)|\$/g, "");
        try {
            var result = katex.renderToString(mathText);
            return result;
        } catch (error) {
            return mathText
        }

    }
    return text.replace(/(\\\([^]*?\\\))|(\$\$[^]*?\$\$)|(\$[^]*?\$)/g, function (m, bracket, doubleDollar, dollar) {
        if (bracket !== undefined || dollar !== undefined || doubleDollar !== undefined) return CleanAndRender(m);
        return m;
    });
}

var highlighter = function (code, lang) {
    if (typeof lang === 'undefined') lang = 'markup';

    if (!Prism.languages.hasOwnProperty(lang)) {
        try {
            loadLanguages([lang]);
        } catch (e) {
            console.warn('** failed to load Prism lang: ' + lang);
            Prism.languages[lang] = false;
        }
    }
    return Prism.languages[lang] ? Prism.highlight(code, Prism.languages[lang]) : code;
};

nb.highlighter = function (text, pre, code, lang) {
    var language = lang || 'text';
    pre.className = 'language-' + language;
    if (typeof code != 'undefined') {
        code.className = 'language-' + language;
    }
    return highlighter(text, language);
};

var parseFile = function (file) {
    var absPath = 'content/blog/' + file;
    var ipynb = JSON.parse(fs.readFileSync(absPath));
    var notebook = nb.parse(ipynb);
    var finalHTML = renderWithDelimitersToString(notebook.render().outerHTML);
    return finalHTML;
}


export default ({ url, file }) => {
    var nbviewerLink = 'https://nbviewer.jupyter.org/url/' + url + '/blog/' + file;
    var finalHTML = parseFile(file);
    return (
        <>
            <span className='badge'><Link to={nbviewerLink}><img src="../icons/nbviewer.svg" alt="nbviewer" /></Link></span>
            {renderHTML(finalHTML)}
        </>
    )
}

