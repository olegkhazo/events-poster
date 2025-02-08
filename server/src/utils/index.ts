export function updateFormatOfEventDate(eventData: string | null | undefined): string {
  // Если eventData равно null или undefined, возвращаем пустую строку
  if (!eventData) {
    return '';
  }

  // Коллекция для перевода ивритских месяцев в числовые значения
  const hebrewMonths: { [key: string]: string } = {
    'ינואר': '01', // Январь
    'פברואר': '02', // Февраль
    'מרץ': '03', // Март
    'אפריל': '04', // Апрель
    'מאי': '05', // Май
    'יוני': '06', // Июнь
    'יולי': '07', // Июль
    'אוגוסט': '08', // Август
    'ספטמבר': '09', // Сентябрь
    'אוקטובר': '10', // Октябрь
    'נובמבר': '11', // Ноябрь
    'דצמבר': '12', // Декабрь
  };

  // Удаляем лишние пробелы и разделяем строку на части
  const trimmedData = eventData.trim();
  const splitDate = trimmedData.split(" ");

  // Регулярное выражение для формата DD/MM/YYYY
  const slashDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  // Регулярное выражение для формата DD.MM.YYYY
  const dotDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  // Регулярное выражение для формата DD.MM (без года)
  const dotDateRegexWithoutYear = /^\d{2}\.\d{2}$/;

  // Регулярное выражение для даты на иврите (например, "יום שלישי, 11 פברואר 2025")
  const hebrewDateRegex = /(\d{1,2})\s+([א-ת]+)\s+(\d{4})/;

  // Проверяем, содержит ли строка диапазон дат (например, "02/02/2025 00:00 עד 26/02/2025 14:00")
  if (trimmedData.includes("עד")) {
    const [startDatePart] = trimmedData.split("עד"); // Берем только начальную дату
    return updateFormatOfEventDate(startDatePart.trim()); // Рекурсивно обрабатываем начальную дату
  }

  // Обработка формата DD/MM/YYYY
  if (slashDateRegex.test(trimmedData)) {
    const [day, month, year] = trimmedData.split("/");
    return `${year}-${month}-${day}`;
  }

  // Обработка формата DD.MM.YYYY
  if (dotDateRegex.test(trimmedData)) {
    const [day, month, year] = trimmedData.split(".");
    return `${year}-${month}-${day}`;
  }

  // Обработка формата DD.MM (без года)
  if (dotDateRegexWithoutYear.test(trimmedData)) {
    const [day, month] = trimmedData.split(".");
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const yearToUse = parseInt(month, 10) < currentMonth ? currentYear + 1 : currentYear;
    return `${yearToUse}-${month}-${day}`;
  }

  // Обработка даты на иврите (например, "יום שלישי, 11 פברואר 2025")
  const hebrewDateMatch = trimmedData.match(hebrewDateRegex);
  if (hebrewDateMatch) {
    const [, day, hebrewMonth, year] = hebrewDateMatch;
    const month = hebrewMonths[hebrewMonth] || '01'; // Если месяц не найден, используем '01'
    return `${year}-${month}-${day.padStart(2, '0')}`;
  }

  // Если формат не распознан, возвращаем пустую строку
  return '';
}

export const filterByEventPage = (items: any[], event_page: string) => {
  return items.filter(item => {
    const isMatch = item.inputParameters.originUrl === event_page;
    return isMatch;
  });
};