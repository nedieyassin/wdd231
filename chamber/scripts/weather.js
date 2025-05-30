const API_KEY = 'b1b15e88fa797225412429c1c50c122a1';
const CHAMBER_LOCATION = {lat: -13.9626, lon: 33.7741}; // Example: Lilongwe


function formatUnixTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Weather rendering
async function loadWeather() {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${CHAMBER_LOCATION.lat}&lon=${CHAMBER_LOCATION.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    const currentWeatherSection = document.getElementById('current-weather');

    const current = document.createElement('div');

    current.classList.add('current');

    temperatureDiv = document.createElement('div');
    temperatureDiv.innerHTML = `<b>${data.current.temp}</b>°C`

    descDiv = document.createElement('div');
    descDiv.innerHTML = `${data.current.weather[0].main}`

    highDiv = document.createElement('div');
    highDiv.innerHTML = `High: ${data.daily[0].temp.max}°C`;

    lowDiv = document.createElement('div');
    lowDiv.innerHTML = `Low: ${data.daily[0].temp.min}°C`

    humidityDiv = document.createElement('div');
    humidityDiv.innerHTML = `Humidity: ${data.current.humidity}%`

    sunriseDiv = document.createElement('div');
    sunriseDiv.innerHTML = `Sunrise: ${formatUnixTime(data.current.sunrise)}`;

    sunsetDiv = document.createElement('div');
    sunsetDiv.innerHTML = `Sunset: ${formatUnixTime(data.current.sunset)}`;


    current.appendChild(temperatureDiv)
    current.appendChild(descDiv)
    current.appendChild(highDiv)
    current.appendChild(lowDiv)
    current.appendChild(humidityDiv)
    current.appendChild(sunriseDiv)
    current.appendChild(sunsetDiv)


    currentWeatherSection.appendChild(current);


    const forecastWeatherSection = document.getElementById('forecast-weather');

    const forecast = document.createElement('div');
    const list = document.createElement('ul');

    for (let i = 1; i <= 3; i++) {
        const li = document.createElement('li');
        const day = data.daily[i];
        li.textContent = `${new Date(day.dt * 1000).toLocaleDateString('en-US', {weekday: 'long'})}: ${day.temp.day}°C`;
        list.appendChild(li);
    }

    forecast.appendChild(list);
    forecastWeatherSection.appendChild(forecast);
}


async function loadSpotlights() {
    const res = await fetch('./data/members.json');
    const members = await res.json();
    const eligible = members.filter(m => [2, 3].includes(m.membershipLevel));


    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('spotlights');

    selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';

        const header = document.createElement('div');
        header.className = 'header';


        const name = document.createElement('h3');
        name.textContent = member.name;

        const desc = document.createElement('p');
        desc.textContent = member.description;

        header.append(name, desc)


        const body = document.createElement('div');
        body.className = 'body';


        const logoDiv = document.createElement('div');
        logoDiv.className = 'logo-div';


        const logo = document.createElement('img');
        logo.src = `images/logos/${member.icon}`;
        logo.alt = `${member.name} logo`;

        logoDiv.appendChild(logo);


        const detailDiv = document.createElement('div');
        detailDiv.className = 'detail-div';


        const phone = document.createElement('p');
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const address = document.createElement('p');
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const website = document.createElement('p');
        const link = document.createElement('a');
        link.href = member.website;
        link.target = '_blank';
        link.textContent = member.website;
        website.innerHTML = `<strong>Website:</strong> `;
        website.appendChild(link);

        detailDiv.append(phone, address, website)

        body.append(logoDiv, detailDiv)

        card.append(header, body);
        container.appendChild(card);
    });
}

loadWeather();
loadSpotlights();