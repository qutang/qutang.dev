import Head from '../components/head'
import Main from '../components/main'
import Side from '../components/side'
import MenuButton from '../components/menu-button'

export default ({ data, children, css, title, environment }) => (
    <html lang="en">
        <Head title={title} css={css} siteName={data.site.title} />
        <body>
            <div className='layout-container'>
                <Side data={data}></Side>
                <Main data={data}>
                    {children}
                </Main>
                <MenuButton data={data} />
            </div>
        </body>
    </html>
)