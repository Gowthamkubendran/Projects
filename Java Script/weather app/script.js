const cityname=document.querySelector(".input");
const city=document.querySelector(".city");
const temp=document.querySelector(".temp");
const wind=document.querySelector(".wind");
const hum=document.querySelector(".humidity");
const weather=document.querySelector(".weather");
const error=document.querySelector(".error");
const image=document.querySelector(".image");




async function fetchWeather(cityName){
    
    const apikey='3ddc3563739715928fed34e0da39a22b';
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apikey}`;
    const response= await fetch(apiurl);

    const data= await response.json();
    if(data.cod === 200){
        
        city.innerHTML=data.name;
        temp.innerHTML=Math.round(data.main.temp)+"°C";
        wind.innerHTML=data.wind.speed+ "Km/h";
        hum.innerHTML=data.main.humidity +"%";
        if(data.weather[0].main === "Clouds"){
            image.src="images/clouds.png";
        }else if(data.weather[0].main === "Rain"){
            image.src="images/rain.png";
        }else if(data.weather[0].main === "Clear"){
            image.src="images/clear.png";
        }else if(data.weather[0].main === "Drizzle"){
            image.src="images/drizzle.png";
        }else if(data.weather[0].main === "Mist"){
            image.src="images/mist.png";
        }else if(data.weather[0].main === "Snow"){
            image.src="images/snow.png";
        }
          weather.style.display="block";
       error.style.display="none";
    }else{
        weather.style.display="none";
       error.style.display="block";
    }
    
}


const Button=document.querySelector(".button");
Button.addEventListener('click',()=>{
    fetchWeather(cityname.value);
    cityname.value="";
});