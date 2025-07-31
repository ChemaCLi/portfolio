export const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate + "-01").toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
  const end = endDate === "2025-07" ? "Present" : new Date(endDate + "-01").toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
  return `${start} - ${end}`;
};
