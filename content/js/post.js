import Gitalk from 'gitalk'

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
});