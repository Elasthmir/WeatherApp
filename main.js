const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('.error');
const temp = document.querySelector('.temp');
const tempIRL = document.querySelector('.tempIRL');
const townResults = document.querySelector('.townResults');
const appTop = document.querySelector('.app_top');

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

const cloudsCover = document.querySelector('.cloudsCover');

var airQuality = '';

//grid  
const parent = document.querySelector(".parent");
const weatherDescription = document.querySelector(".div1");
const weatherPressure = document.querySelector(".div2");
const weatherHumidity = document.querySelector(".div3");
const weatherWind = document.querySelector(".div4");
const weatherRains = document.querySelector(".div5");
const weatherVisibility = document.querySelector(".div6");
const weatherP25 = document.querySelector(".div7");
const weatherWindSpeed = document.querySelector(".div8");
const div9 = document.querySelector(".div9");



function getWeather() {
    townResults.innerHTML += `<button class="left-btn"><i class="arrow" style="font-size: 20px;">&#8656;</i></button>
    <button class="right-btn"><i class="arrow" style="font-size: 20px;">&#8658;</i></button>`
    const apiCity = input.value;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${apiCity}&count=10&language=en&format=json`;

    axios.get(url).then(response => {
        let cordsArrayLat = [];
        let cordsArrayLon = [];
        let time = [];
        //console.log(response);
        if (response.data.results == undefined) {

            townResults.textContent = "Nie ma takiego miasta!!!"
            //console.log('error')

        } else {
            response.data.results.forEach(element => {
                if (element.name !== apiCity) { return; }
                if (element.admin3 == undefined) { element.admin3 = ""; }

                cordsArrayLat.push(element.latitude);
                cordsArrayLon.push(element.longitude);
                time.push(element.timezone);

            })
            arrayCounter = 0
            response.data.results.forEach(element => {
                input.classList.add("fadeOutElements")

                button.classList.add("fadeOutElements")
                //  parent.style.display = 'none'
                if (element.name !== apiCity) { return; }
                // if (element.country_code !== "PL") { return; }
                if (element.admin3 == undefined) { return; }
                // console.log(element);

                //nie wiem czy to dodać


                /*
                function splitString(woj, pow) {
                    if (woj.includes(" ")) {

                        element.admin1 = woj.split(" ");


                        element.admin1 = element.admin1[1]

                    }
                    if (pow.includes(" ")) {

                        element.admin2 = pow.split(" ");


                        element.admin2 = element.admin2[1]

                    }
                    return element.admin1, element.admin2
                }
                splitString(element.admin1, element.admin2)
                */


                townResults.innerHTML += `  <div class='eachTown  slide' ><span class='nameTown'><span class = 'label'>miejscowowość: </span><br/>${element.name}<br/><span class = 'label'>gmina: </span><br/>${element.admin3}<br/><span class = 'label'>powiat: </span><br/>${element.admin2}<br/><span class = 'label'>województwo: </span><br/>${element.admin1}<br/><span class = 'label'>Państwo: </span><br/>${element.country}</span></span></div>`

                const slides = document.querySelectorAll(".slide");

                // loop through slides and set each slides translateX
                slides.forEach((slide, indx) => {
                    slide.style.transform = `translateX(${indx * 100}%)`;
                });

                // select next slide button
                const nextSlide = document.querySelector(".right-btn");

                // current slide counter
                let curSlide = 0;
                // maximum number of slides
                let maxSlide = slides.length - 1;

                // add event listener and navigation functionality
                nextSlide.addEventListener("click", function () {
                    // check if current slide is the last and reset current slide
                    if (curSlide === maxSlide) {
                        curSlide = 0;
                    } else {
                        curSlide++;
                    }

                    //   move slide by -100%
                    slides.forEach((slide, indx) => {
                        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
                    });
                });

                // select next slide button
                const prevSlide = document.querySelector(".left-btn");

                // add event listener and navigation functionality
                prevSlide.addEventListener("click", function () {
                    // check if current slide is the first and reset current slide to last
                    if (curSlide === 0) {
                        curSlide = maxSlide;
                    } else {
                        curSlide--;
                    }

                    //   move slide by 100%
                    slides.forEach((slide, indx) => {
                        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
                    });
                });



            });
            const nameTown = document.querySelectorAll('.eachTown');
            //console.log(nameTown.length)
            for (let index = 0; index <= nameTown.length; index++) {
                nameTown[index].addEventListener("click", function () {
                    $("#townResults").fadeOut(500, function () {
                        $(".fadeInElements").fadeIn(500);
                    });

                    // Using plain JavaScript
                    var firstDiv = document.getElementById("firstDiv");
                    var secondDiv = document.getElementById("secondDiv");



                    setTimeout(function () {
                        firstDiv.style.opacity = "0";
                        secondDiv.style.transition = "opacity 0.5s";
                        secondDiv.style.opacity = 1;
                    }, 500);


                    //console.log(cordsArrayLat[index], cordsArrayLon[index], time[index])
                    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${cordsArrayLat[index]}&longitude=${cordsArrayLon[index]}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m`

                    axios.get(weatherURL).then(responseWeather => {

                        //console.log(responseWeather);


                        let d = new Date();
                        d = d.getHours();
                        //console.log(d)
                        //console.log(responseWeather.data.hourly.time[d]);

                        imgApi = apiLink + apiCity + apiKey + apiUnits + apiLang
                        axios.get(imgApi).then(imgApi => {
                            //console.log(imgApi)

                            //d = d + timeZonesArray[time[index]]

                            //console.log(time[index])



                            function getTimezoneOffset(timeZone) {
                                const now = new Date();
                                const tzString = now.toLocaleString('en-US', { timeZone });
                                const localString = now.toLocaleString('en-US');
                                const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
                                const offset = diff + now.getTimezoneOffset() / 60;

                                return -offset;
                            }
                            let windDescription;
                            let array;
                            const offset = getTimezoneOffset(time[index]);
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) <= 45) {

                                windDescription = 'Południowy'
                                array = '&#8593;'

                            }

                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) > 45 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 90) {

                                windDescription = 'Południowo-Zachodni'
                                array = '&#8599;'

                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) > 90 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 125) {

                                windDescription = 'Wschodni'
                                array = '&#8594;'
                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) > 125 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 180) {

                                windDescription = 'Północno-Zachodni';
                                array = '&#8600;';

                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) >= 180 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 225) {

                                windDescription = 'Północny'
                                array = '&#8595;'
                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) >= 225 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 270) {

                                windDescription = 'Północno-Wschodni'
                                array = '&#8601;'


                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) >= 270 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 315) {

                                windDescription = 'Wschodni'
                                array = '&#8592;'



                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) >= 315 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 335) {

                                windDescription = 'Południowo-Wschodni'
                                array = '&#8598;'



                            }
                            if (Math.round(responseWeather.data.hourly.wind_direction_10m[d]) >= 335 && Math.round(responseWeather.data.hourly.wind_direction_10m[d]) < 360) {

                                windDescription = 'Południowy'
                                array = '&#8598;'



                            }






                            //console.log(offset);
                            parent.classList.add("fadeInElements");
                            d = d + offset - 1
                            axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${cordsArrayLat[index]}&longitude=${cordsArrayLon[index]}&hourly=pm2_5`).then(responseAir => {

                                airQuality += responseAir.data.hourly.pm2_5[d]
                                console.log(responseAir.data.hourly.pm2_5[d])
                                // img.src = `https://openweathermap.org/img/wn/${imgApi.data.weather[0].icon}.png`;
                                weatherDescription.innerHTML += `
                            <div class = 'firstDiv'>
                                <div class='firstPart'>
                                
                                <br/>
                                Temperatura<br/><span class = 'values'>${feels_like.textContent = Math.round(responseWeather.data.hourly.temperature_2m[d])} </span>&#176;C
                                <br/>
                                Odczuwalna: <br/> <span class = 'values'>${Math.round(responseWeather.data.hourly.apparent_temperature[d])} </span>&#176;C <br/>
                                <br/>
                               
                                </div>
                                <div class='secondPart'>
                                    ${imgApi.data.weather[0].description}<br/>
                                    Zachmurzenie:<br/> <span class = 'values'>${responseWeather.data.hourly.cloud_cover[d]}</span> %
                                </div>
                            </div>`

                                weatherPressure.innerHTML += `<div>
                                Ciśnienie<br/>
                                <span class = 'values'>${Math.round(responseWeather.data.hourly.surface_pressure[d])}</span>
                                <br/>
                                <span>hPa</span>
                            <div>`


                                weatherHumidity.innerHTML += `<div>
                                Wilgotność<br/>
                                <span class = 'values'>${responseWeather.data.hourly.relative_humidity_2m[d]}</span>
                                <br/>%
                            <div>`
                                weatherWind.innerHTML += `<div>
                                Wiatr<br/>
                                <span class = 'values'>${Math.round(responseWeather.data.hourly.wind_speed_10m[d])}</span>
                                <br/>
                                <span>km/h</span>
                            <div>`
                                weatherRains.innerHTML += `<div>Opady: 
                                    <br/> 
                                    deszcz:<span class = 'values'>${Math.round(responseWeather.data.hourly.rain[d])}</span>mm śnieg:
                                    <span class = 'values'>${Math.round(responseWeather.data.hourly.snowfall[d])}</span>mm
                                    <br/>
                                    <center>Warstwa śniegu<br/><span class = 'values'>${Math.round(responseWeather.data.hourly.snow_depth[d])}</span>mm</center>
                                    
                            <div>`
                                weatherVisibility.innerHTML += `<div>
                                Widoczność<br/><span class = 'values'>${Math.round(responseWeather.data.hourly.visibility[d] / 1000)}</span>
                                <br/>
                                <span>Km</span>
                            <div>`
                                weatherP25.innerHTML += `<div>
                                Zanieczyszczenie<br/>
                                <span class = 'values'>${responseAir.data.hourly.pm2_5[d]}</span>
                                <br/>
                                <span>&#x3BC;g/m&#179;  </span>
                            <div>`
                                weatherWindSpeed.innerHTML += `<div>
                                Kierunek wiatru: <br/>
                                <span class = 'values'>${array}<br/>${windDescription}</span>
                                <br/>
                                
                            <div>`




                                const backButton = document.querySelector(".back");
                                backButton.addEventListener("click", () => {


                                    location.reload()

                                })


                            })




                        })



                    })

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

        //console.log(error);
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
        townResults.innerHTML += "";

    }

}

button.addEventListener('click', getWeather);
input.addEventListener('keypress', getWeatherByEnter);
