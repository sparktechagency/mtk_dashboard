

const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    day: "2-digit", 
    month: "long", 
    year: "numeric" 
  };
  
  // "28 June 2025"
  const formatted = date.toLocaleDateString("en-GB", options);

  // Insert comma before the year
  const parts = formatted.split(" ");
  return `${parts[0]} ${parts[1]}, ${parts[2]}`;
};

export default getFormattedDate;