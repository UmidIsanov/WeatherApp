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
import GetWeatherIcon from './GetWeatherIcon';

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
  const [wicon, setWicon] = useState<string>('01d');
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
      setWicon(weatherIconCode);
      console.log(data)

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
        <img width={300} height={300} style={{objectFit: 'cover'}} src={GetWeatherIcon(wicon || '')} alt='clear icon' />
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
          <img src={windyIcon} alt='' className='icon Image' />
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
