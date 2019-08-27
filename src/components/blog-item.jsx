import Link from './link'

export default ({ post }) => (
    <section className='blog-item-container'>
        <header className='blog-item-header-container'>
            <h2>
                <Link to={post.path}>{post.meta.title}</Link>
            </h2>
        </header>
        <section className='blog-item-description-container'>
            <p className='blog-item-first-letter'>{post.meta.excerpt.slice(0, 1)}</p>
            <p className='blog-item-description'>{post.meta.excerpt.slice(1)}</p>
        </section>
        <footer className='blog-item-footer-container'>
            <time className='blog-item-date'><small>{post.meta.date}</small></time>
        </footer>
    </section>
)