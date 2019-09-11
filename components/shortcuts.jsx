import ShortcutItem from "./shortcut-item";

export default props => {
  var shortcuts = props.shortcuts.filter(
    shortcut => shortcut.icon !== "comment" || props.pageType === "post"
  );
  return (
    <ul className="shortcut-container">
      {shortcuts.map(shortcut => {
        return (
          shortcut.to && (
            <li key={shortcut.to}>
              <ShortcutItem
                to={shortcut.to}
                iconType={shortcut.icon}
                text={shortcut.text}
              />
            </li>
          )
        );
      })}
      <li>
        <ShortcutItem
          to={"#"}
          iconType={"top"}
          text={"Back to top"}
        />
      </li>
    </ul>
  );
};
