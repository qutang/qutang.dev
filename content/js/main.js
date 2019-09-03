import Gitalk from 'gitalk'
import jump from 'jump.js'

document.addEventListener("DOMContentLoaded", function () {
    const toComment = document.querySelector('.shortcut-comment');
    const toTop = document.querySelector('.shortcut-top');

    const gitalk = new Gitalk({
        clientID: '2f172a19c2ca22c9ee9e',
        clientSecret: '88c512ebe5862cb937b13b62a970e762942a8d33',
        repo: 'qutang.dev-comments',
        owner: 'qutang',
        admin: ['qutang'],
        id: location.pathname.slice(0, 50),      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    })

    try {
        gitalk.render('gitalk-container')
    } catch (error) {
        console.error(error)
    }
    toTop.style.display = "none";
    toTop && toTop.addEventListener('click', (e) => {
        e.preventDefault();
        jump('.layout-container', {
            duration: 1000,
        })
    })
    toComment && toComment.addEventListener('click', (e) => {
        jump('#comments', {
            duration: 1000,
        })
    });

    window.onscroll = (e) => {
        if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
            // if (toTop.style.display === 'none') {
            toTop.style.display = 'flex';
            // }
        } else {
            toTop.style.display = 'none';
        }
    }
});