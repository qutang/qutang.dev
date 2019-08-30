import TwoColumnLayout from './two-column'
import moment from 'moment'

export default ({ meta, ...props }) => (
    <TwoColumnLayout {...props} title={meta.title} css="../css/post.css" pageType='post'>
        <header><h2>{meta.title}</h2></header>
        <section className='post-meta-container'>
            <span className='post-meta-series'>
                <a href={"/blog/series#" + meta.series || ""}>{meta.series || ""}</a>
            </span>{" | "}
            <time className='post-meta-date'>
                {moment(meta.date).format('MMM DD, YYYY')}
            </time>
        </section>
        <article>
            {props.children}
        </article>
        <section class='post-comment-container'>
            <h2 id='comments'>Comments</h2>
            <div id='gitalk-container'></div>
        </section>
    </TwoColumnLayout>
);