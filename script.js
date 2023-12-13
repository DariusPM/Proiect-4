let currCity = "Timisoara";
let units = "metric";

let city = document.querySelector(".weathercity");
let datetime = document.querySelector(".weatherdatetime");
let weatherforecast = document.querySelector(".weatherforecast");
let weathertemp = document.querySelector(".weathertemp");
let weathericon = document.querySelector(".weathericon");
let weatherminmax = document.querySelector(".weatherminmax");
let weatherrealfeel = document.querySelector(".weatherrealfeel");
let weatherhumidity = document.querySelector('.weatherhumidity');
let weatherwind = document.querySelector('.weatherwind');
let weatherpressure = document.querySelector('.weatherpressure');


document.querySelector(".weathersearch").addEventListener('submit', e => {
    let search = document.querySelector(".weatherserchform");

    e.preventDefault();

    currCity=search.value;

    getWeather();

    search.value = ""

})

document.querySelector(".weatherunitcelsius").addEventListener('click', () => {
    if(units !== "metric"){
        
        units = "metric"
         
        getWeather()
    }
})

document.querySelector(".weatherunitfarenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        
        units = "imperial"
         
        getWeather()
    }
})



function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600; // convert seconds to hours

  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}
function getWeather() {
  const API_KEY = "c081df2157e639f93de1b3c5ff22730f";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weatherforecast.innerHTML = `<p>${data.weather[0].main}`;
      weathertemp.innerHTML = `${data.main.temp.toFixed()}&#176`;
      weathericon.innerHTML = `  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;
      weatherminmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
      weatherrealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weatherhumidity.innerHTML = `${data.main.humidity}%`;
      weatherwind.innerHTML = `${data.wind.speed} ${
        units === "imperial" ? "mph" : "m/s"
      }`;
      weatherpressure.innerHTML = `${data.main.pressure} hPa`;
    });
}

document.body.addEventListener("load", getWeather());
