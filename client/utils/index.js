import { FORM_VALIDATION_PATTERNS } from "@/utils/constants";

export function updateFormatOfEventDate(eventData) {
  const splitDate = eventData.split(" ");
  const datePart = splitDate.slice(-1)[0];

  // Check the string format for DD/MM/YYYY
  const slashDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  // Check the string format for DD.MM (без года)
  const dotDateRegexWithoutYear = /^\d{2}\.\d{2}$/;

  // Check the string format for DD.MM.YYYY
  const dotDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

  if (slashDateRegex.test(datePart)) {
    return datePart;
  } else if (dotDateRegex.test(datePart)) {
    // Convert DD.MM.YYYY to DD/MM/YYYY
    return datePart.replace(/\./g, "/");
  } else if (dotDateRegexWithoutYear.test(datePart)) {
    return `${datePart}.2024`.replace(/\./g, "/");
  } else {
    return "";
  }
}

export function sortByDate(events) {
  return events
    .filter(event => event.eventDate) 
    .sort((a, b) => {
      const dateA = new Date(a.eventDate.split("/").reverse().join("-"));
      const dateB = new Date(b.eventDate.split("/").reverse().join("-"));
      return dateA - dateB;
    });
}

// Form fields validator function. Used inside computed property
export function validateFormField(fieldData, validator) {
  const data = fieldData;
  const regExp = FORM_VALIDATION_PATTERNS[validator]; 

  return data !== "" && regExp.test(data); 
}
