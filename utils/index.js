export function updateFormatOfEventDate(eventData) {
    const splitDate = eventData.split(" ");
    const datePart = splitDate.slice(-1)[0];
  
    // Check the string format for DD/MM/YYYY
    const slashDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    // Check the string format for DD.MM.YYYY
    const dotDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  
    if (slashDateRegex.test(datePart)) {
      return datePart;
    } else if (dotDateRegex.test(datePart)) {
      // Convert DD.MM.YYYY to DD/MM/YYYY
      return datePart.replace(/\./g, "/");
    } else {
     return("");
    }
  }