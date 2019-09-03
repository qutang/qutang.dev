import Link from "./link";
import icons from './icon';


export default props => {
  const Icon = icons(props.iconType)
  return (
    <div className="shortcut-item">
      <Link to={props.to} className={'shortcut-' + props.iconType}>
        <Icon />
        <span>{props.text}</span>
      </Link>
    </div>
  )
};
