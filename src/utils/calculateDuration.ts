export const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate + "-01");
  const end = endDate === "2025-07" ? new Date() : new Date(endDate + "-01");
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0 && remainingMonths > 0) {
    return `${years}y ${remainingMonths}m`;
  } else if (years > 0) {
    return `${years}y`;
  } else {
    return `${remainingMonths}m`;
  }
};
