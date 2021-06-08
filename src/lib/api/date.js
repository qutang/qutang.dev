function toLocale(dateStr, locale) {
  locale = locale == "cn" ? "zh-cn" : "en";
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDaysAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const daysAgo = Math.floor((now - date) / 1000 / 3600 / 24);
  return daysAgo;
}

function toHumanReadable(dateStr, locale) {
  const daysAgo = getDaysAgo(dateStr);
  if (locale == "cn") {
    if (daysAgo == 0) {
      return "今天";
    }
    else if (daysAgo <= 31) {
      return daysAgo + "天前";
    }
    else {
      return "最近没有";
    }
  } else {
    if (daysAgo == 0) {
      return "today";
    } else if (daysAgo <= 31) {
      return daysAgo + " days ago";
    }
    else {
      return "long long ago";
    }
    
  }
}

export { toLocale, toHumanReadable, getDaysAgo };
