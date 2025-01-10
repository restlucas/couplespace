import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function dateDifference(dateFromDatabase: string): string {
  if (!dateFromDatabase) return "--:--:--";

  // Data vinda do banco
  const startDate = dayjs(dateFromDatabase);
  // Data atual
  const currentDate = dayjs();

  // Calcula a diferença total em meses
  const totalMonths = currentDate.diff(startDate, "months");
  // Calcula a diferença total em anos
  const totalYears = currentDate.diff(startDate, "years");

  // Calcula os meses e dias restantes
  const remainingMonths = totalMonths % 12;
  const remainingDays = currentDate.diff(
    startDate.add(totalYears, "years").add(remainingMonths, "months"),
    "days"
  );

  let result = "";

  // Verificar e montar o resultado de forma condicional
  if (totalYears > 0) {
    result += `${totalYears} ano${totalYears > 1 ? "s" : ""}`;
  }

  if (remainingMonths > 0) {
    if (result) result += ", "; // Adiciona separador se já houver algo antes
    result += `${remainingMonths} mês${remainingMonths > 1 ? "es" : ""}`;
  }

  if (remainingDays > 0 || (!totalYears && !totalMonths)) {
    if (result) result += ", "; // Adiciona separador se já houver algo antes
    result += `${remainingDays} dia${remainingDays > 1 ? "s" : ""}`;
  }

  // Retorna o resultado
  return result || "0 dia"; // Caso não haja diferença, retorna "0 dia"
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
    // Menos de 1 hora
    return differenceInMinutes === 1
      ? "há 1 minuto"
      : `há ${differenceInMinutes} minutos`;
  } else if (differenceInHours < 24) {
    // Menos de 1 dia
    return differenceInHours === 1
      ? "há 1 hora"
      : `há ${differenceInHours} horas`;
  } else if (differenceInDays < 30) {
    // Menos de 1 mês
    return differenceInDays === 1 ? "há 1 dia" : `há ${differenceInDays} dias`;
  } else if (differenceInMonths < 12) {
    // Menos de 1 ano
    return differenceInMonths === 1
      ? "há 1 mês"
      : `há ${differenceInMonths} meses`;
  } else {
    // 1 ano ou mais
    return differenceInYears === 1
      ? "há 1 ano"
      : `há ${differenceInYears} anos`;
  }
}
