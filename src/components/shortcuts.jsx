import ShortcutItem from './shortcut-item'

export default props => {
  var shortcuts = props.shortcuts.filter(shortcut => shortcut.icon !== 'comment' || props.pageType === 'post');
  return (<nav>
    <ul className='shortcut-container'>
        {shortcuts.map(shortcut => {
        return (
            <li key={shortcut.to}>
                <ShortcutItem
                    to={shortcut.to}
                    iconType={shortcut.icon}
                    text={shortcut.text}
                />
            </li>
        )
        })}
    </ul>
  </nav>)
}
