import Gitalk from 'gitalk'
import tocbot from 'tocbot';

document.addEventListener("DOMContentLoaded", function () {
    const gitalk = new Gitalk({
        clientID: '2f172a19c2ca22c9ee9e',
        clientSecret: '88c512ebe5862cb937b13b62a970e762942a8d33',
        repo: 'qutang.dev-comments',
        owner: 'qutang',
        admin: ['qutang'],
        id: location.pathname.slice(0, 50),      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')

    tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.side-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: 'article',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1, h2, h3',
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
    })
});