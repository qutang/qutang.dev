var commander = require('commander');
var package = require('../package.json');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

function fillTemplate(template, title, obj) {
    template = template.replace(/{{title}}/g, title);
    template = template.replace(/{{date}}/g, moment().format('YYYY-MM-DD HH:mm:ss'));
    template = template.replace(/{{series}}/g, obj.series || '');
    return template
}

function getTemplateFile(type) {
    return path.resolve(__dirname, '..', 'templates', type + '.html.mdx')
}

function getDestinationFile(title) {
    return path.resolve(__dirname, '..', 'content', 'blog', title + '.html.mdx');
}

function getDestinationMarkdown(title) {
    return path.resolve(__dirname, '..', 'content', 'markdown', title + '.md');
}

function getDestinationPythonNotebook(title) {
    return path.resolve(__dirname, '..', 'content', 'pynotebook', title + '.ipynb');
}

const program = new commander.Command()
program.version(package.version)

program
    .command("new <title>")
    .description("Create a new blog article")
    .option('-t, --type <type>', "The type of the new blog article")
    .option('-s, --series <series>', "The series of the article")
    .action((title, cmdObj) => {
        console.log('---')
        console.log('Selected article type: ' + cmdObj.type)
        console.log('Article title: ' + title)
        console.log('---')
        title = title.toLowerCase().replace(/\s/g, '-');
        src = getTemplateFile(cmdObj.type);
        dest = getDestinationFile(title);
        template = fs.readFileSync(src, 'utf8');
        template = fillTemplate(template, title, cmdObj);
        fs.writeFileSync(dest, template);
        console.log('Created article file: ' + dest);
        if (cmdObj.type === "mdx_markdown") {
            dest = getDestinationMarkdown(title)
            fs.writeFileSync(dest, "")
            console.log("Created markdown file: " + dest);
        } else if (cmdObj.type === "mdx_ipynb") {
            dest = getDestinationPythonNotebook(title)
            fs.writeFileSync(dest, "")
            console.log("Created ipynb file: " + dest);
        }
        console.log('---')
    });

program.parse(process.argv);