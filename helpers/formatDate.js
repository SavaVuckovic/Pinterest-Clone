module.exports = function formatDate(dateFromMongo) {
  const formattedDate = dateFromMongo.toString().slice(4, 16);
  return formattedDate;
}
