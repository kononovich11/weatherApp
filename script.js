document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

// Elements
const form = document.querySelector('form');
const inputSearch = document.querySelector('.autocompleteSearch');

// work with Form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = getCityName();
    getDataFromApi(city);
});

function getCityName() {
    const inputSearchValue = inputSearch.value;
    return inputSearchValue;
}
function getDate() {
    const currentDateObj = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDayMonth = `${days[currentDateObj.getDay()]}, ${currentDateObj.getDay()} ${months[currentDateObj.getMonth()]}`;
    return currentDayMonth;
}

function createElementsOfCard(data) { 
    console.log(data);
    
    const card = document.querySelector('.card');
    const cardTitle = document.createElement('h3');
    const cardDate = document.createElement('h4');
    card.innerHTML ='';

    cardTitle.textContent = data.name;
    cardDate.textContent = getDate();

    card.appendChild(cardTitle);
    card.appendChild(cardDate);
    
    const {main, description, icon} = data.weather[0];
    const {temp, feels_like, pressure, humidity} = data.main;
    const {speed} = data.wind;
    const {all} = data.clouds;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const needDataObj = {
        main,
        description,
        iconUrl, 
        temp,
        feels_like,
        pressure,
        humidity,
        speed, 
        all
    };

    for (let key in needDataObj) {
        if (key == 'iconUrl') {
            const img = document.createElement('img');
            img.src = iconUrl;
            card.appendChild(img);
        } else {
            const rowWeather = document.createElement('p');
            rowWeather.textContent = `${key}: ${needDataObj[key]}`;
            card.appendChild(rowWeather);
        }
    }
   
}

async function getDataFromApi(city) {
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8404e484fd35ab1089ddcd4ce507e732`).then(response => {
        return response.json();
    }).then(dataObj => {
        return dataObj;
    }).catch(err => {
        console.log(err);
    });

    getObjAllData(data);
}


function getObjAllData(data) {
    createElementsOfCard(data)

}
