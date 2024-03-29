export const handleFormatDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-GB", {
      day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

export const formatUSCurrency = (num: number) => {
  if (isNaN(num)) {
    const randomNumber = Math.floor(Math.random() * 1000);
    const roundedNumber = Math.ceil(randomNumber / 100) * 100;
    const numberString = roundedNumber.toFixed(2);

    const parts = numberString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + parts.join(".");
  }

  const numberString = num.toFixed(2);
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + parts.join(".");
};

export const reformatString = (string: string) => {
  const cleanString = string.replace(/[^a-zA-Z0-9]/g, "");
  const lowercaseString = cleanString.toLowerCase();
  const randomString = Math.random().toString(36).substring(2, 10);

  return lowercaseString + "-" + randomString;
};

export const formatColor = (string: string) => {
  switch (string) {
    case "PENDING":
      return "text-secondary";
    case "PROCESSING":
      return "text-warning";
    case "FULFILLED":
      return "text-success";
    case "RECEIVED":
      return "text-primary";

    default:
      break;
  }
};
