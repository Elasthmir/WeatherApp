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


//grid 

const div1 = document.querySelector(".div1");
const div2 = document.querySelector(".div2");
const div3 = document.querySelector(".div3");
const div4 = document.querySelector(".div4");
const div5 = document.querySelector(".div5");
const div6 = document.querySelector(".div6");
const div7 = document.querySelector(".div7");
const div8 = document.querySelector(".div8");
const div9 = document.querySelector(".div9");



function getWeather() {

    const apiCity = input.value;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${apiCity}&count=100&language=pl&format=json`;

    axios.get(url).then(response => {
        let cordsArrayLat = [];
        let cordsArrayLon = [];
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


                townResults.innerHTML += `<div class='eachTown'><span class='nameTown'><span class = 'label'>miejscowowość: </span><br/>${element.name}<br/><span class = 'label'>gmina: </span><br/>${element.admin3}<br/><span class = 'label'>powiat: </span><br/>${element.admin2}<br/><span class = 'label'>województwo: </span><br/>${element.admin1}</span><br/><span class = 'label'>Państwo: </span><br/>${element.country}</span></div>`

                if (cordsArrayLat.length >= 3) {

                    const $menu = document.querySelector('.townResults');
                    const $items = document.querySelectorAll('.eachTown');
                    let itemWidth = $items[0].clientWidth;
                    let wrapWidth = $items.length * itemWidth;

                    let scrollY = 0;
                    let y = 0;




                    const lerp = (v0, v1, t) => {
                        return v0 * (1 - t) + v1 * t;
                    };

                    const Ja = (t, e) => {
                        return t || t === 0 ? e(t) : e;
                    };
                    const wrap = (e, t, r) => {
                        const i = t - e;
                        return Ja(r, function (t) {
                            return (i + (t - e) % i) % i + e;
                        });
                    };






                    const dispose = (scroll) => {
                        $items.forEach((el, i) => {
                            const x = `${i * itemWidth + scroll}`;
                            const s = wrap(-itemWidth * 16, (wrapWidth - itemWidth) * 2.4, parseInt(x));
                            el.style.transform = `translate(${s}px, 0px)`;
                        });
                    };
                    dispose(0);


                    let touchStart = 0;
                    let touchX = 0;
                    let isDragging = false;
                    const handleTouchStart = (e) => {
                        touchStart = e.clientX || e.touches[0].clientX;
                        isDragging = true;
                    };
                    const handleTouchMove = (e) => {
                        if (!isDragging) return;
                        touchX = e.clientX || e.touches[0].clientX;
                        scrollY += (touchX - touchStart);
                        touchStart = touchX;
                    };
                    const handleTouchEnd = () => {
                        isDragging = false;
                    };






                    $menu.addEventListener('touchstart', handleTouchStart);
                    $menu.addEventListener('touchmove', handleTouchMove);
                    $menu.addEventListener('touchend', handleTouchEnd);

                    $menu.addEventListener('mousedown', handleTouchStart);
                    $menu.addEventListener('mousemove', handleTouchMove);
                    $menu.addEventListener('mouseleave', handleTouchEnd);
                    $menu.addEventListener('mouseup', handleTouchEnd);

                    $menu.addEventListener('selectstart', () => { return false; });






                    window.addEventListener('resize', () => {
                        itemWidth = $items[0].clientWidth;
                        wrapWidth = $items.length * itemWidth;
                    });





                    const render = () => {
                        requestAnimationFrame(render);
                        y = lerp(y, scrollY, 0.1);
                        dispose(y);
                    };
                    render();


                }
            });
            const nameTown = document.querySelectorAll('.eachTown');
            console.log(nameTown.length)
            for (let index = 0; index <= nameTown.length; index++) {
                nameTown[index].addEventListener("click", function () {
                    $("#townResults").fadeOut(500, function () {
                        $(".fadeInElements").fadeIn(500);
                    });

                    // Using plain JavaScript
                    var firstDiv = document.getElementById("firstDiv");
                    var secondDiv = document.getElementById("secondDiv");



                    setTimeout(function () {
                        firstDiv.style.display = "none";
                        secondDiv.style.transition = "opacity 0.5s";
                        secondDiv.style.opacity = 1;
                    }, 500);


                    console.log(cordsArrayLat[index], cordsArrayLon[index])
                    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${cordsArrayLat[index]}&longitude=${cordsArrayLon[index]}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m`

                    axios.get(weatherURL).then(responseWeather => {

                        console.log(responseWeather);


                        let d = new Date();
                        d = d.getHours();
                        //console.log(d)
                        //console.log(responseWeather.data.hourly.time[d]);

                        imgApi = apiLink + apiCity + apiKey + apiUnits + apiLang
                        axios.get(imgApi).then(imgApi => {
                            console.log(imgApi)
                            // img.src = `https://openweathermap.org/img/wn/${imgApi.data.weather[0].icon}.png`;
                            div1.innerHTML += `<div>
                                                    <img src='https://openweathermap.org/img/wn/${imgApi.data.weather[0].icon}.png'/>
                                                    <br/>
                                                    ${feels_like.textContent = responseWeather.data.hourly.temperature_2m[d]} &#176;C
                                                    <br/>
                                                    ${imgApi.data.weather[0].description}
                                                    <br/>
                                                    
                                                    ${responseWeather.data.hourly.time[d]}<br/>
                                                    Temperatura odczuwalna:  ${responseWeather.data.hourly.apparent_temperature[d]} &#176;C <br/>
                                                    Zachmurzenie: ${responseWeather.data.hourly.cloud_cover[d]} %
                                                </div>`

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
