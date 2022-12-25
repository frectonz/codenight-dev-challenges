const numberFormatter = new Intl.NumberFormat("en-US");
const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
});

export const formatNumber = (number: number) => numberFormatter.format(number);
export const formatRelativeTime = (date: Date) =>
  relativeTimeFormatter.format(date.getTime() - Date.now(), "second");
