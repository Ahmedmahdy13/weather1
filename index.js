

const container = document.querySelector('.container')
const search = document.querySelector('.search-box')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')
const cityHide = document.querySelector('.city-hide')

search.addEventListener('click', () => {

    WeatherSearch();

})


// Execute a function when the user presses a key on the keyboard
search.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        WeatherSearch();

    }
});


function WeatherSearch() {

    const APIkey = 'ed52501131c55285e8c3e68201100999'
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return
        }
        else {
            cityHide.textContent = city

            container.style.height = '555px';
            container.classList.add('active');

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const now = new Date();
            const hours = now.getHours();
            var ampm = hours >= 12 ? 'pm' : 'am';

            switch (json.weather[0].main) {
                case 'Clear':
                    console.log(ampm)
                    if (ampm == 'am') {
                        image.src = 'images/mooon.png';

                    }
                    else {
                        image.src = 'images/clear.png';

                    }
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`

            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elClonenInfoWeather = infoWeather.cloneNode(true);
            const elClonenInfoHumidity = infoHumidity.cloneNode(true);
            const elClonenInfoWind = infoWind.cloneNode(true);

            elClonenInfoWeather.id = 'clone-info-weather';
            elClonenInfoWeather.classList.add('active-clone')


            elClonenInfoHumidity.id = 'clone-info-humidity';
            elClonenInfoHumidity.classList.add('active-clone')

            elClonenInfoWind.id = 'clone-info-wind';
            elClonenInfoWind.classList.add('active-clone')

            // setTimeout(() => {
            //       infoWeather.insertAdjacentElement("afterend",elClonenInfoWeather);
            //      infoHumidity.insertAdjacentElement("afterend",elClonenInfoHumidity);
            //      infoWind.insertAdjacentElement("afterend",elClonenInfoWind);
            // }, 2200);

            const clonenInfoWeather = - document.querySelectorAll('.info-weather.active-clone');

            const totalCloneInfoWeather = clonenInfoWeather.length;
            const clonenInfoWeatherFirst = clonenInfoWeather[0];

            const clonenInfoHumidity = - document.querySelectorAll('.info-humidity.active-clone');

            const clonenInfoHumidityFirst = clonenInfoHumidity[0];


            const clonenInfoWind = - document.querySelectorAll('.info-wind.active-clone');

            const clonenInfoWindFirst = clonenInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                clonenInfoWeatherFirst.classList.remove('active-clone')
                clonenInfoHumidityFirst.classList.remove('active-clone')
                clonenInfoWindFirst.classList.remove('active-clone')

                setTimeout(() => {
                    clonenInfoWeatherFirst.remove();
                    clonenInfoHumidityFirst.remove();
                    clonenInfoWindFirst.remove();
                }, 2200);
            }




        }

    })
}