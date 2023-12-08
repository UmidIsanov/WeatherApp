import React, { useState } from 'react'
import clearIcon from '../assets/clear.png'
import cloudyIcon from '../assets/cloud.png'
import rainyIcon from '../assets/rain.png'
import snowyIcon from '../assets/snow.png'
import thunderIcon from '../assets/thunder.png'
import windyIcon from '../assets/wind.png'
import searchIcon from '../assets/search.png'
import humidityIcon from '../assets/humidity.png'
import drizzleIcon from '../assets/drizzle.png'
import './WeatherApp.css'

interface WeatherProps {
temp?: number
location?: string
humidity?: number
}


const WeatherApp: React.FC<WeatherProps> = () => {


const [wicon, setWicon]=useState(snowyIcon)


const Search = async () => {
const element = document.getElementsByClassName('cityInput')[0] as HTMLInputElement
if(element.value[0] === '') {
  return 0
}


let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=745f4f060564fcc91ddfa6083279a610`
let response = await fetch(url)
let data = await response.json()
const humudity = document.getElementsByClassName('humidity-persentage')[0] as HTMLDivElement
const wind = document.getElementsByClassName('wind-speed')[0] as HTMLDivElement 
const temprature = document.getElementsByClassName('weather-temp')[0] as HTMLDivElement
const location = document.getElementsByClassName('weather-location')[0] as HTMLDivElement
humudity.innerHTML = `${data.main.humidity}`
wind.innerHTML = `${data.wind.speed} hm/h`
temprature.innerHTML = ` ${Math.floor( data.main.temp)} &deg;`
location.innerHTML = `${data.name}`
if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
  setWicon(clearIcon)
}
else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
  setWicon(cloudyIcon)}
else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
  setWicon(drizzleIcon)}
else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
  setWicon(rainyIcon)}
else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
  setWicon(rainyIcon)}
else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
  setWicon(snowyIcon)}
else{
  setWicon(clearIcon)
}

}
  return (
  <div className='container'>
    <div className='top-bar'>
      <div className='search-box'>
        <input type='text' className='cityInput' placeholder='Search...'/>
      
      </div>
      <div className='search-icon' onClick={()=>{Search()}}> 
          <img src={searchIcon} alt='search icon'/>
        </div>
    </div>
    <div className='weather-image'>
      <img src={wicon} alt='clear icon'/>
    </div>
    <div className='weather-temp'> 15 &deg;</div>
    <div className='weather-location'>London</div>
    <div className='data-container'>
       <div className='element'>
        <img src={humidityIcon} alt='' className='icon'/>
        <div className='data'>
          <div className='humidity-persentage'>64%</div>
          <div className='text'>Humidity</div>
        </div>
       </div>
       <div className='element'>
        <img src={windyIcon} alt='' className='icon'/>
        <div className='data'>
          <div className='wind-speed'>18 hm/h</div>
          <div className='text'>Wind</div>
        </div>
       </div>
      
    </div>
  </div>
  )
}
export default WeatherApp