const getLinkAttrs = function(to) {
  if (to.includes("//")) {
    return { target: "_blank", rel: "noreferrer noopener external" };
  } else if (to.endsWith("pdf")) {
    return { target: "_blank", rel: "bookmark" };
  } else {
    return { target: "_self", rel: "bookmark" };
  }
};

export default ({ to, children, ...rest }) => {
  var attrs = getLinkAttrs(to);
  return (
    <a href={to} {...rest} target={attrs.target} rel={attrs.rel}>
      {children}
    </a>
  );
};
