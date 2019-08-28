import Link from "./link";

export default props => (
  <div className="shortcut-item">
    <Link to={props.to} className="color-scheme-light">
      <img src={"../icons/" + props.iconType + ".svg"} alt="" />
      <span>{props.text}</span>
    </Link>
  </div>
);
