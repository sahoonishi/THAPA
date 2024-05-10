let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");

let w_forecast = document.querySelector(".weather_forecast");

let w_icon = document.querySelector(".weather_icon");

let w_temperature = document.querySelector(".weather_temperature");


let w_minTem = document.querySelector(".weather_min");

let maxTem = document.querySelector(".weather_max");


const getCountryName = (code) =>{
  return new Intl.DisplayNames([code] , {type: "region"}).of(code);
}

const getDateTime = (dt) =>{
  const curDate = new Date(dt * 1000);
  
  const options = {
    weekday: "long" ,
    year: "numeric" ,
    month: "long" ,
    day: "numeric" ,
    hour: "numeric" ,
    minute: "numeric" ,

  };

  const formatter = new Intl.DateTimeFormat("en-US" , options);
  return formatter.format(curDate);

}

let city = "Odisha"; 

let newData = document.querySelector(".weather_search");

newData.addEventListener('submit' , (e) =>{
  e.preventDefault();
  let cityName = document.querySelector(".city_name");
  city = cityName.value;
  getWeatherData();
  cityName.value= "";
})


const getWeatherData = async() =>{
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`;

  try{
    const res = await fetch(weatherUrl);
    const data = await res.json(); 
    const {main , name , weather , wind , sys , dt} = data;
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_temperature.innerHTML = `${main.temp}&#176`
  }
  catch(error){
    console.log(error);
  }
}

document.body.addEventListener("load" , getWeatherData());