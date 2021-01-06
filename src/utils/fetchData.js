const fs = require("fs");
const axios = require("axios");

const countriesSummaryUrl = "https://api.covid19api.com/summary";
const countryStatUrl = "https://api.covid19api.com/live/country/";

const fetchData = async (url, param = null) => {
  const data = await axios.get(url + (param || ""));
  return await data.data;
};

const countryCoordinates = (countries) => {
  if (!countries) {
    console.log("Countries array not found!");
    return;
  }

  const countryCoors = {};
  countries.forEach((country, i) => {
    setTimeout(async () => {
      const data = await fetchData(countryStatUrl, country.Slug);
      const coors = [
        Number.parseFloat(data[0].Lat),
        Number.parseFloat(data[0].Lon),
      ];
      console.log(coors);
      countryCoors[country.Slug] = coors;
      console.log(countryCoors);
      fs.writeFile(
        "../dev-data/countryCoors.json",
        JSON.stringify(countryCoors),
        (err) => {
          console.log(err);
        }
      );
    }, i * 1000);
  });
  //   console.log(countryCoors);
  return countryCoors;
};

const getCountries = async () => {
  const result = await fetchData(countriesSummaryUrl);
  const countries = result.Countries;
  const data = countryCoordinates(countries);
  // fs.writeFile("../dev-data/countryCoors.json", JSON.stringify(data), (err) => {
  //   console.log(err);
  // });
};

getCountries();
