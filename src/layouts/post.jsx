import TwoColumnLayout from './two-column'
import moment from 'moment'

export default ({ meta, ...props }) => (
    <TwoColumnLayout {...props} title={meta.title} css="../css/post.css">
        <header><h2>{meta.title}</h2></header>
        <section className='post-meta-container'><small><strong>{moment(meta.date).format('MMM DD, YYYY')}</strong></small></section>
        <article>
            {props.children}
        </article>
    </TwoColumnLayout>
);