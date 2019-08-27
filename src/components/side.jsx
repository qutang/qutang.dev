import Shortcuts from './shortcuts'
import Avatar from './avatar'
import Footer from './footer'

export default ({ data }) => {
  return (
    <aside className="side-container">
      <Avatar avatar={data.site.avatar} />
      <Shortcuts shortcuts={data.shortcuts} />
      <Footer author={data.site.author} />
    </aside>
  )
}
