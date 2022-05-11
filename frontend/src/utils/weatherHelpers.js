export const getDirectionFromValue = value => {
  switch (value) {
    case "N":
      return "north"
    case "NE":
      return "northeast"
    case "E":
      return "east"
    case "SE":
      return "southeast"
    case "S":
      return "south"
    case "SW":
      return "southwest"
    case "W":
      return "west"
    case "NW":
      return "northwest"
    case "VAR":
      return "variable"
    default:
      return ""
  }
}
export const getCloudCoverFromValue = value => {
  switch (value) {
    case "SKC":
      return "sky clear"
    case "FEW":
      return "few"
    case "SCT":
      return "scattered"
    case "BKN":
      return "broken"
    case "OVC":
      return "overcast"
    default:
      return ""
  }
}

export const weatherTypes = [
  "no precipitation",
  "light rain",
  "rain",
  "heavy rain",
  "light snow",
  "snow",
  "heavy snow",
  "light shower of rain",
  "shower of rain",
  "heavy shower of rain",
  "light shower of snow",
  "shower of snow",
  "heavy shower of snow",
  "drizzle",
  "snow grains",
  "hail",
  "graupel",
  "fog",
  "mist",
  "haze"
]

export const hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23"
]
