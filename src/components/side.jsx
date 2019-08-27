import Shortcuts from './shortcuts'

export default ({data}) => {
  return (
    <aside className="side-container">
        <Shortcuts shortcuts={data.shortcuts} />
    </aside>
  )
}
