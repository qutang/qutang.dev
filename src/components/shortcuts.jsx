import ShortcutItem from './shortcut-item'

export default props => (
  <nav>
    <ul className='shortcut-container'>
        {props.shortcuts.map(shortcut => {
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
  </nav>
)
