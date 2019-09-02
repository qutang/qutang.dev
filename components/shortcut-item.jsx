import Link from "./link";
import icons from './icon';


export default props => {
  const Icon = icons(props.iconType)
  return (
    <div className="shortcut-item">
      <Link to={props.to} className="color-scheme-light">
        <Icon />
        {/* <img src={"../icons/" + props.iconType + ".svg"} alt="" /> */}
        <span>{props.text}</span>
      </Link>
    </div>
  )
};
