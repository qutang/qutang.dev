import ShortcutItem from "./shortcut-item";

export default props => {
  var shortcuts = props.shortcuts.filter(
    shortcut => shortcut.icon !== "comment" || props.pageType === "post"
  );
  return (
    <nav className="shortcut-container">
      {shortcuts.map(shortcut => {
        return (
          shortcut.to && (
            <ShortcutItem
              key={shortcut.to}
              to={shortcut.to}
              iconType={shortcut.icon}
              text={shortcut.text}
            />
          )
        );
      })}
      <ShortcutItem to={"#"} iconType={"top"} text={"Back to top"} />
    </nav>
  );
};
