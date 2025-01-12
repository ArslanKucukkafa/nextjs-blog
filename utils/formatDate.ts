export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
