const { faker } = require("@faker-js/faker");

// locations ID:s 1-364

const usersData = [];

for (let i = 0; i < 50; i++) {
  const userName = faker.name.firstName();
  const email = faker.internet.exampleEmail(userName).toLowerCase();

  usersData.push({
    email,
    username: userName,
    location: { id: Math.ceil(Math.random() * 364) },
  });
}

const wind_directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "VAR"];

const weatherAndCloud = [
  {
    weather: "no precipitation",
    cloudCover: "FEW",
    cloudType: "Cu",
  },
  {
    weather: "no precipitation",
    cloudCover: "SCT",
    cloudType: "Cumulus and Stratocumulus",
  },
  {
    weather: "fair weather",
    cloudCover: "FEW",
    cloudType: "Cirrus",
  },
  {
    weather: "sunny",
    cloudCover: "SCT",
    cloudType: "Cu",
  },
  {
    weather: "fog",
    cloudCover: "OVC",
    cloudType: "Thick stratus clouds",
  },
  {
    weather: "Shower of rain",
    cloudCover: "BKN",
    cloudType: "CB,Cu",
  },
  {
    weather: "light shower of rain",
    cloudCover: "BKN",
    cloudType: "TCu, Cu, Ci",
  },
  {
    weather: "heavy shower of rain",
    cloudCover: "BKN",
    cloudType: "Thunderstorms",
  },
  {
    weather: "rain",
    cloudCover: "OVC",
    cloudType: "Thick frontal clouds (NS)",
  },
  {
    weather: "no precipitation",
    cloudCover: "BKN",
    cloudType: "Sc",
  },
  {
    weather: "no precipitation",
    cloudCover: "BKN",
    cloudType: "Ac",
  },
  {
    weather: "Shower, rain and hail",
    cloudCover: "BKN",
    cloudType: "Cb, Cu",
  },
  {
    weather: "sunny",
    cloudCover: "SKC",
    cloudType: null,
  },
  {
    weather: "drizzle",
    cloudCover: "BKN",
    cloudType: "Low-hanging stratus clouds",
  },
  {
    weather: "mist",
    cloudCover: "SKC",
    cloudType: null,
  },
  {
    weather: "light snowfall",
    cloudCover: "BKN",
    cloudType: "St, Sc, and probably thick clouds above",
  },
  {
    weather: "no precipitation",
    cloudCover: "BKN",
    cloudType: "Cu",
  },
];

const getTemperature = (date) => {
  const month = date.getMonth();

  switch (month) {
    case 0:
    case 1:
    case 11:
      return Math.floor(Math.random() * 9.5) * (Math.random > 0.7 ? 1 : -1);
    case 2:
    case 3:
    case 4:
      return Math.floor(Math.random() * 15) + (Math.random() > 0.4 ? 1.5 : 2);
    case 5:
    case 6:
    case 7:
      return Math.floor(Math.random() * 23) + 12;
    case 8:
    case 9:
    case 10:
      return Math.floor(Math.random() * 14) + (Math.random() > 0.7 ? 0.5 : 0);
    default:
      return 10;
  }
};

const getWeatherData = (userId) => {
  const observation_time = faker.date.between(
    "2021-01-01T00:00:00.000Z",
    "2022-05-16T00:00:00.000Z"
  );
  const temperature = getTemperature(observation_time);
  const wind_direction =
    wind_directions[Math.floor(Math.random() * wind_directions.length)];
  const weatherClouds =
    weatherAndCloud[Math.floor(Math.random() * weatherAndCloud.length)];

  return {
    observation_time,
    temperature,
    wind_direction,
    wind_speed: Math.floor(Math.random() * 22),
    weather: weatherClouds.weather,
    cloud_cover: weatherClouds.cloudCover,
    cloud_types: weatherClouds.cloudType,
    personal: faker.lorem.words(Math.ceil(Math.random() * 20) + 3),
    owner: { id: userId },
  };
};

module.exports = { usersData, getWeatherData };
