const baseUrl = "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/"

const AllIcons: IconsInterface = {
  "01d": "day.svg",
  "01n": "night.svg",
  "02d": "cloudy-day-2.svg",
  "02n": "cloudy-night-2.svg",
  "03d": "cloudy-day-1.svg",
  "03n": "cloudy-night-1.svg",
  "04d": "cloudy-day-3.svg",
  "04n": "cloudy-night-3.svg",
  "09d": "rainy-6.svg",
  "09n": "rainy-6.svg",
  "10d": "rainy-1.svg",
  "10n": "rainy-7.svg",
  "11d": "thunder.svg",
  "11n": "thunder.svg",
  "13d": "snowy-6.svg",
  "13n": "snowy-6.svg",
  "50d": "cloudy.svg",
  "50n": "cloudy.svg",
}

interface IconsInterface {
  [propName: string]: string;
}

const GetWeatherIcon = (icon: string): string => {
  return baseUrl + AllIcons[icon];
}

export default GetWeatherIcon