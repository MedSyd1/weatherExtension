import { getWeather } from "./weather";
import { ICON_MAP } from "./iconMap";

navigator.geolocation.getCurrentPosition(success, failure);

function success({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ).then(renderWeather);
}

function failure(error) {
  console.log(error);
}

function renderWeather(data) {
    renderCurrentWeather(data)
    renderDailyWeather(data)
    renderHourlyWeather(data)
    document.body.classList.remove("blurred")
}

function setValue(selector,value,{parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = value
}

const getUrl  = (iconCode) => {
    return `./icons/${ICON_MAP.get(iconCode)}.png`
}

function renderCurrentWeather({current}){
   document.querySelector("[data-current-icon]").src =  getUrl(current.iconCode)
    setValue("current-temp",current.currentTemp)
    setValue("current-high",current.highTemp)
    setValue("current-fl-high",current.highFeelsLike)
    setValue("current-wind",current.windSpeed)
    setValue("current-low",current.lowTemp)
    setValue("current-fl-low",current.lowFeelsLike)
    setValue("current-precip",current.precip)
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined,{weekday:"long"})
const daySection  = document.querySelector(".day-section")
const day_card_template = document.querySelector(".day-card-template")

function renderDailyWeather({daily}){
  daySection.innerHTML = ""
  daily.forEach((day) =>{
    const element = day_card_template.content.cloneNode(true)
    element.querySelector(".weather-icon").src = getUrl(day.iconCode)
    setValue("date",DAY_FORMATTER.format(day.timestamp),{parent:element})
    setValue("temp",day.maxTemp,{parent:element})
    daySection.append(element)
  })
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined,{ hour:"numeric"})

const hourSection = document.querySelector(".hour-section")

const hour_row_template = document.querySelector(".hour-row-template")

function renderHourlyWeather({hourly}){
  hourSection.textContent = ""
  hourly.forEach(hour => {
  const element = hour_row_template.content.cloneNode(true)
  setValue("day",DAY_FORMATTER.format(hour.timestamp),{parent:element})
  setValue("time",HOUR_FORMATTER.format(hour.timestamp),{parent:element})
   element.querySelector(".weather-icon").src = getUrl(hour.iconCode) 
  setValue("temp",hour.temp,{parent:element})
  setValue("fl-temp",hour.feelsLike,{parent:element})
  setValue("wind",hour.windSpeed,{parent:element})
  setValue("precip",hour.precip,{parent:element})
  hourSection.append(element)
  })
}
