const getDataSummary = "https://api.covid19api.com/summary";
const getCountryTotalStatus = "https://api.covid19api.com/live/country/"; // + slug-country
const getCountryStatusAfterDate =
  "https://api.covid19api.com/live/country/south-africa/status/confirmed/date/"; // + date (2020-03-21T13:13:30Z)

const api = {
  getDataSummary,
  getCountryTotalStatus,
  getCountryStatusAfterDate,
};

export default api;
