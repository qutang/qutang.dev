function toLocale(dateStr, locale) {
  locale = locale == "cn" ? "zh-cn" : "en";
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { toLocale };
