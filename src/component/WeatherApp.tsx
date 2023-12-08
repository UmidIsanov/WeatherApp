import React, { useState } from 'react';
import clearIcon from '../assets/clear.png';
import cloudyIcon from '../assets/cloud.png';
import rainyIcon from '../assets/rain.png';
import snowyIcon from '../assets/snow.png';
import windyIcon from '../assets/wind.png';
import searchIcon from '../assets/search.png';
import humidityIcon from '../assets/humidity.png';
import drizzleIcon from '../assets/drizzle.png';
import './WeatherApp.css';

interface WeatherProps {
  temp?: number;
  location?: string;
  humidity?: number;
}

interface WeatherData {
  main: {
    humidity: number;
    temp: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  weather: {
    icon: string;
  }[];
}

const WeatherApp: React.FC<WeatherProps> = () => {
  const [wicon, setWicon] = useState<string>(clearIcon);
  const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const Search = async () => {
    const element = document.querySelector('.cityInput') as HTMLInputElement;

    if (!element.value) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=745f4f060564fcc91ddfa6083279a610`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: WeatherData = await response.json();

      const humudity = document.querySelector('.humidity-persentage') as HTMLDivElement;
      const wind = document.querySelector('.wind-speed') as HTMLDivElement;
      const temperature = document.querySelector('.weather-temp') as HTMLDivElement;
      const location = document.querySelector('.weather-location') as HTMLDivElement;

      humudity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} hm/h`;
      temperature.innerHTML = `${Math.floor(data.main.temp)} &deg;`;
      location.innerHTML = `${data.name}`;

      const weatherIconCode = data.weather[0]?.icon || '';
      switch (weatherIconCode) {
        case '01d':
        case '01n':
          setWicon(clearIcon);
          break;
        case '02d':
        case '02n':
          setWicon(cloudyIcon);
          break;
        case '03d':
        case '03n':
          setWicon(drizzleIcon);
          break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
          setWicon(rainyIcon);
          break;
        case '13d':
        case '13n':
          setWicon(snowyIcon);
          break;
        default:
          setWicon(clearIcon);
      }

      const filteredCities = data.name.toLowerCase().includes(value.toLowerCase());
      setAutocompleteItems(filteredCities ? [data.name] : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <div className='search-box'>
          <input type='text' className='cityInput' placeholder='Search...' onChange={(event) => setValue(event.target.value)} />
          <ul className='autocomplete'>
            {autocompleteItems.map((name, index) => (
              <li className='autocomplete_item' key={index}>
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className='search-icon' onClick={Search}>
          <img src={searchIcon} alt='search icon' />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt='clear icon' />
      </div>
      <div className='weather-temp'>{/* Display temperature here */}</div>
      <div className='weather-location'>{/* Display location here */}</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-persentage'></div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windyIcon} alt='' className='icon' />
          <div className='data'>
            <div className='wind-speed'></div>
            <div className='text'>Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
