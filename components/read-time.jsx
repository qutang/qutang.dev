import ReactDOMServer from 'react-dom/server';

var getReadTime = function (contentStr) {
    var stripContentStr = contentStr.replace(/(<([^>]+)>)/ig, "");
    var chineseChars = stripContentStr.match(/[\u4e00-\u9fa5]/g)
    var chineseCount = chineseChars === null ? 0 : chineseChars.length;
    var englishCount = stripContentStr.replace(/[\u4e00-\u9fa5]/g, '').split(/\s/g).length;
    var readTime = Math.ceil(chineseCount / 500 + englishCount / 250)
    return readTime;
}

export default getReadTime