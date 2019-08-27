export default props => (
    <div className='shortcut-item'>
        <a href={props.to} className='color-scheme-light'>
            <img src={"../icons/" + props.iconType + '.svg'} alt=""/>
            <span>{props.text}</span>
        </a>
    </div>
)