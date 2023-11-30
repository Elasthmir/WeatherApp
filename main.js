const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('.error');
const temp = document.querySelector('.temp');
const tempIRL = document.querySelector('.tempIRL');
const townResults = document.querySelector('.townResults');

const city = document.querySelector('.city');
const img = document.querySelector('img');
const temp_description = document.querySelector('.temp_description');

const feels_like = document.querySelector('.feels_like');
const preassure = document.querySelector('.preassure');
const humiditi = document.querySelector('.humiditi');
const wind_speed = document.querySelector('.wind_speed');
const clouds = document.querySelector('.clouds');
const imgPollution = document.querySelector('.img_pollution');
const pm25Info = document.querySelector('span.pm25');
const circle = document.getElementById('img_pollution');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=bd32ab9c0523e3343f7fc5ce52d32f0f';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

const apiLink1 = 'http://api.openweathermap.org/geo/1.0/zip?zip=83135,PL';
const apiKey1 = '&appid=bd32ab9c0523e3343f7fc5ce52d32f0f';
const apiUnits1 = '&units=metric';
const apiLang1 = '&lang=pl';


let cordsArrayLat = [];
let cordsArrayLon = [];



function getWeather() {

    const apiCity = input.value;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${apiCity}&count=100&language=pl&format=json`;

    axios.get(url).then(response => {

        console.log(response);
        if (response.data.results == undefined) {

            townResults.textContent = "Nie ma takiego miasta!!!"
            console.log('error')

        } else {
            response.data.results.forEach(element => {
                if (element.name !== apiCity) { return; }
                if (element.admin3 == undefined) { return; }

                cordsArrayLat.push(element.latitude);
                cordsArrayLon.push(element.longitude);

            })
            arrayCounter = 0
            response.data.results.forEach(element => {

                if (element.name !== apiCity) { return; }
                // if (element.country_code !== "PL") { return; }
                if (element.admin3 == undefined) { return; }
                // console.log(element);
                townResults.innerHTML += `<div class='eachTown'><span class='nameTown'>${element.name}<br/>${element.admin3}<br/>${element.admin2}<br/>${element.admin1}</span></div>`





            });
            const nameTown = document.querySelectorAll('.eachTown');
            console.log(nameTown.length)
            for (let index = 0; index <= nameTown.length; index++) {
                nameTown[index].addEventListener("click", function () {

                    console.log(cordsArrayLat[index], cordsArrayLon[index])

                })

            }
        }
        // townResults.textContent = response.data.results[0].id









        /* city.textContent = `${response.data.name}, ${response.data.sys.country}`;
         feels_like.textContent = `${Math.round(response.data.main.feels_like)} ℃`;
         img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
         clouds.textContent = `${response.data.clouds.all}`;
         temp.textContent = `${response.data.weather[0].description}`;
         preassure.textContent = `${response.data.main.pressure} hpa`;
         humiditi.textContent = `${response.data.main.humidity}%`;
         wind_speed.textContent = `${Math.round(response.data.wind.speed * 3, 6)} km/h`;
         clouds.textContent = `${response.data.clouds.all}%`;
         tempIRL.textContent = `${Math.round(response.data.main.temp)}℃`
 
         errorMsg.textContent = '';
         //Air pollution API
         */




    }).catch(error => {

        console.log(error);
        if (error.response.data.results == undefined) {

            errorMsg.textContent = `${error.response.data.message}`;
        }

        [townResults, city, temp, temp_description, feels_like, preassure, humiditi, wind_speed, clouds].forEach(el => {

            el.textContent = ''
        })
        img.src = ''
        circle.style.backgroundColor = 'transparent'
        pm25Info = ''
    }).finally(() => {

        input.value = ''

    })


}

const getWeatherByEnter = (e) => {

    if (e.key === 'Enter') {

        getWeather();
        townResults.innerHTML = "";

    }

}

button.addEventListener('click', getWeather);
input.addEventListener('keypress', getWeatherByEnter);
