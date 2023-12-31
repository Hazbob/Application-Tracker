const { format, parse } = require("date-fns");
type DateString =
  `${number}${number}/${number}${number}/${number}${number}${number}${number}`;

export default function formatDateStringToISO(dateString: DateString): string {
  if (dateString) {
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());

    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
  }
  return;
}
