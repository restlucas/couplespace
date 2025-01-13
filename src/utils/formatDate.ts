import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function dateDifference(dateFromDatabase: string): string {
  if (!dateFromDatabase) return "--:--:--";

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
    result += `${totalYears} ano${totalYears > 1 ? "s" : ""}`;
  }

  if (remainingMonths > 0) {
    if (result) result += ", ";
    result += `${remainingMonths} ${remainingMonths > 1 ? "meses" : "mês"}`;
  }

  if (remainingDays > 0 || (!totalYears && !totalMonths)) {
    if (result) result += ", ";
    result += `${remainingDays} dia${remainingDays > 1 ? "s" : ""}`;
  }

  return result || "0 dia";
}

export function timeSinceRecord(dateFromDatabase: string | Date): string {
  if (!dateFromDatabase) return "--:--:--";

  const startDate = dayjs(dateFromDatabase);
  const currentDate = dayjs();

  const differenceInMinutes = currentDate.diff(startDate, "minutes");
  const differenceInHours = currentDate.diff(startDate, "hours");
  const differenceInDays = currentDate.diff(startDate, "days");
  const differenceInMonths = currentDate.diff(startDate, "months");
  const differenceInYears = currentDate.diff(startDate, "years");

  if (differenceInMinutes < 60) {
    // Less than 1 hour
    return differenceInMinutes === 1
      ? "há 1 minuto"
      : `há ${differenceInMinutes} minutos`;
  } else if (differenceInHours < 24) {
    // Less than 1 day
    return differenceInHours === 1
      ? "há 1 hora"
      : `há ${differenceInHours} horas`;
  } else if (differenceInDays < 30) {
    // Less than 1 month
    return differenceInDays === 1 ? "há 1 dia" : `há ${differenceInDays} dias`;
  } else if (differenceInMonths < 12) {
    // Less than 1 year
    return differenceInMonths === 1
      ? "há 1 mês"
      : `há ${differenceInMonths} meses`;
  } else {
    // 1 year or more
    return differenceInYears === 1
      ? "há 1 ano"
      : `há ${differenceInYears} anos`;
  }
}
