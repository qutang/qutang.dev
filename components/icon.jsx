import Blog from '../content/icons/blog.svg'
import Charge from '../content/icons/charge.js.svg'
import Comment from '../content/icons/comment.svg'
import Github from '../content/icons/github.svg'
import Home from '../content/icons/home.svg'
import LinkedIn from '../content/icons/linkedin.svg'
import Lost from '../content/icons/lost.svg'
import Medium from '../content/icons/medium.svg'
import Plus from '../content/icons/plus.svg'
import Rss from '../content/icons/rss.svg'
import Telegram from '../content/icons/telegram.svg'
import User from '../content/icons/user.svg'
import Wechat from '../content/icons/wechat.svg'
import Top from '../content/icons/top.svg'
import Previous from '../content/icons/left-arrow.svg'
import Next from '../content/icons/right-arrow.svg'

export default (type) => {
    switch (type) {
        case 'blog':
            return Blog
        case 'chargejs':
            return Charge
        case 'comment':
            return Comment
        case 'github':
            return Github
        case 'home':
            return Home
        case 'linkedin':
            return LinkedIn
        case 'lost':
            return Lost
        case 'medium':
            return Medium
        case 'plus':
            return Plus
        case 'rss':
            return Rss
        case 'telegram':
            return Telegram
        case 'user':
            return User
        case 'wechat':
            return Wechat
        case 'top':
            return Top
        case 'previous':
            return Previous
        case 'next':
            return Next;
    }
}
