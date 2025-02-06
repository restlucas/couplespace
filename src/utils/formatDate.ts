import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt";
import "dayjs/locale/en";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function dateDifference(
  dateFromDatabase: string,
  locale: string
): string {
  if (!dateFromDatabase) return "--:--:--";

  dayjs.locale(locale);

  const startDate = dayjs(dateFromDatabase);
  const currentDate = dayjs();

  const totalMonths = currentDate.diff(startDate, "months");
  const totalYears = currentDate.diff(startDate, "years");

  const remainingMonths = totalMonths % 12;
  const remainingDays = currentDate.diff(
    startDate.add(totalYears, "years").add(remainingMonths, "months"),
    "days"
  );

  let result = "";

  if (totalYears > 0) {
    result += `${totalYears} ${
      totalYears > 1
        ? locale === "pt"
          ? "anos"
          : "years"
        : locale === "pt"
        ? "ano"
        : "year"
    }`;
  }

  if (remainingMonths > 0) {
    if (result) result += ", ";
    result += `${remainingMonths} ${
      remainingMonths > 1
        ? locale === "pt"
          ? "meses"
          : "months"
        : locale === "pt"
        ? "mês"
        : "month"
    }`;
  }

  if (remainingDays > 0 || (!totalYears && !totalMonths)) {
    if (result) result += ", ";
    result += `${remainingDays} ${
      remainingDays > 1
        ? locale === "pt"
          ? "dias"
          : "days"
        : locale === "pt"
        ? "dia"
        : "day"
    }`;
  }

  return result || (locale === "pt" ? "0 dia" : "0 day");
}

export function timeSinceRecord(
  dateFromDatabase: string | Date,
  locale: string
): string {
  if (!dateFromDatabase) return "--:--:--";

  dayjs.locale(locale);

  const startDate = dayjs(dateFromDatabase);
  const currentDate = dayjs();

  const differenceInMinutes = currentDate.diff(startDate, "minutes");
  const differenceInHours = currentDate.diff(startDate, "hours");
  const differenceInDays = currentDate.diff(startDate, "days");
  const differenceInMonths = currentDate.diff(startDate, "months");
  const differenceInYears = currentDate.diff(startDate, "years");

  if (differenceInMinutes < 60) {
    return differenceInMinutes === 1
      ? locale === "pt"
        ? "há 1 minuto"
        : "1 minute ago"
      : locale === "pt"
      ? `há ${differenceInMinutes} minutos`
      : `${differenceInMinutes} minutes ago`;
  } else if (differenceInHours < 24) {
    return differenceInHours === 1
      ? locale === "pt"
        ? "há 1 hora"
        : "1 hour ago"
      : locale === "pt"
      ? `há ${differenceInHours} horas`
      : `${differenceInHours} hours ago`;
  } else if (differenceInDays < 30) {
    return differenceInDays === 1
      ? locale === "pt"
        ? "há 1 dia"
        : "1 day ago"
      : locale === "pt"
      ? `há ${differenceInDays} dias`
      : `${differenceInDays} days ago`;
  } else if (differenceInMonths < 12) {
    return differenceInMonths === 1
      ? locale === "pt"
        ? "há 1 mês"
        : "1 month ago"
      : locale === "pt"
      ? `há ${differenceInMonths} meses`
      : `${differenceInMonths} months ago`;
  } else {
    return differenceInYears === 1
      ? locale === "pt"
        ? "há 1 ano"
        : "1 year ago"
      : locale === "pt"
      ? `há ${differenceInYears} anos`
      : `${differenceInYears} years ago`;
  }
}
