const getDataSummary = "https://api.covid19api.com/summary";
const getCountryTotalStatus = "https://api.covid19api.com/live/country/"; // + slug-country
const getCountryStatusAfterDate =
  "https://api.covid19api.com/live/country/south-africa/status/confirmed/date/"; // + date (2020-03-21T13:13:30Z)

const getWorldDataTimeline = "https://corona-api.com/timeline";
const getCountriesDataTimeline = "https://corona-api.com/countries";

const api = {
  getDataSummary,
  getCountryTotalStatus,
  getCountryStatusAfterDate,
  getWorldDataTimeline,
  getCountriesDataTimeline,
};

export default api;
