const cityinput= document.querySelector('.city-input')
const searchbutton= document.querySelector('.Search')

const apikey='4e3e77596be1133bfda33a9e44549d4d'

const notfoundsection= document.querySelector('.not-found')
const searchcitysection= document.querySelector('.search-city')
const weatherinfosection= document.querySelector('.weather-info')
const countrytext = document.querySelector('.country-text')
const temperature= document.querySelector('.temp')
const condition= document.querySelector('.condition')
const humidt= document.querySelector('.humidity-value')
const windtext= document.querySelector('.Wind-value')
const weatherimage= document.querySelector('.weather-summary-image')
const currentdate= document.querySelector('.current-date')
const forecastitems= document.querySelector('.forecast-itemcontainer')
const weatheralert = document.querySelector('.weather-alert')
const alerttext = document.querySelector('.alert-text')
const sunrisevalue = document.querySelector('.sunrise-value')
const sunsetvalue = document.querySelector('.sunset-value')

searchbutton.addEventListener('click', () => {
    if(cityinput.value.trim() != ''){
       updateweatherInfo(cityinput.value)
       cityinput.value=''
       cityinput.blur()
    }
})
cityinput.addEventListener('keydown',(event)=>{
    if (event.key == 'Enter' &&
        cityinput.value.trim() != ''
    ) {
       updateweatherInfo(cityinput.value) 
       cityinput.value=''
       cityinput.blur()
    }
})

async function getFetchData(endpoint,city){
    const apiurl=`https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`
    const response= await fetch(apiurl)
    return response.json()
}

function getweathericon(id){
    if(id<= 232) return 'thunderstorm.svg'
    if(id<= 321) return 'drizzle.svg'
    if(id<= 531) return 'rain.svg'
    if(id<= 622) return 'snow.svg'
    if(id<= 781) return 'atmosphere.svg'
    if(id<= 800) return 'clear.svg'
    else return 'clouds.svg'
}

function getcurrentdate(){
    const currentdate= new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentdate.toLocaleDateString('en-GB', options)
}

function formatUnixTime(unixTimestamp, timezoneOffset) {
    // Convert Unix timestamp + API timezone offset (seconds) to local city time
    const utcMs = unixTimestamp * 1000
    const cityMs = utcMs + timezoneOffset * 1000
    const date = new Date(cityMs)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

function getAlertMessage(id) {
    if (id >= 200 && id <= 232) return '⚡ Thunderstorm warning! Stay indoors.'
    if (id >= 500 && id <= 531) return '🌧️ Heavy rain expected. Carry an umbrella.'
    if (id >= 600 && id <= 622) return '❄️ Snowfall alert! Drive carefully.'
    if (id >= 700 && id <= 781) return '🌫️ Low visibility conditions. Be cautious.'
    if (id === 781) return '🌪️ Tornado warning! Seek shelter immediately.'
    return null
}

async function updateweatherInfo(city){
    const weatherData = await getFetchData('weather', city)

    if (weatherData.cod != 200){
        showdisplaysection(notfoundsection)
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed },
        sys: { sunrise, sunset },
        timezone
    } = weatherData

    countrytext.textContent = country
    temperature.textContent = Math.round(temp) + '°C'
    condition.textContent = main
    humidt.textContent = humidity + '%'
    windtext.textContent = speed + 'M/s'
    currentdate.textContent = getcurrentdate()
    weatherimage.src = `pblphoto/${getweathericon(id)}`

    // Sunrise & Sunset
    sunrisevalue.textContent = formatUnixTime(sunrise, timezone)
    sunsetvalue.textContent = formatUnixTime(sunset, timezone)

    // Weather Alert
    const alertMsg = getAlertMessage(id)
    if (alertMsg) {
        alerttext.textContent = alertMsg
        weatheralert.style.display = 'flex'
    } else {
        weatheralert.style.display = 'none'
    }

    await forecatinfo(city)
    showdisplaysection(weatherinfosection)
}

async function forecatinfo(city){
    const forecastdata = await getFetchData('forecast', city)
    const timetaken = '12:00:00'
    const todaydate = new Date().toISOString().split('T')[0]
    forecastitems.innerHTML= ''
    forecastdata.list.forEach(forecastweather =>{
        if(forecastweather.dt_txt.includes(timetaken) &&
        !forecastweather.dt_txt.includes(todaydate)){
        updateforecast(forecastweather)
        }
    })
    
    function updateforecast(weatherData){
        const {
            dt_txt: date,
            weather: [{id}],
            main: {temp}
        } = weatherData

        const datetaken= new Date(date)
        const dateoption ={
            day : '2-digit',
            month:'short'
        }
        const dateresult = datetaken.toLocaleDateString('en-US', dateoption)
        const forecastitem=`
            <div class="forecat-item">
                <h5 class="forecast-date reg-txt">${dateresult}</h5>
                <img src="pblphoto/${getweathericon(id)}" class="forecat-item-img">
                <h5 class="forecast=temp">${Math.round(temp)} °C</h5>
            </div>
        `
        forecastitems.insertAdjacentHTML('beforeend', forecastitem)
    }
}

function showdisplaysection(section){
    [weatherinfosection,searchcitysection,notfoundsection]
        .forEach(section=>section.style.display='none')
    section.style.display= 'flex'    
}