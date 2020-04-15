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

function createElementsOfCard(data) { 
    console.log(data);
    //Elements Card
    const card = document.querySelector('.card');
    const cardTitle = document.createElement('h3');
    const cardDate = document.createElement('h4');
    card.innerHTML ='';

    cardTitle.textContent = data.city.name;

    //Date
    const currentDateObj = new Date();
    const fullNumberDate = data.list[0].dt_txt.slice(0,10); 
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const currentFullDate = `${days[currentDateObj.getDay()]}, ${fullNumberDate}`;
    cardDate.textContent = currentFullDate;

    card.appendChild(cardTitle);
    card.appendChild(cardDate);
   
    const currentDayInfoObj = data.list[0];

    const {temp, feels_like, pressure, sea_level, humidity} = data.list[0].main;
    const {main, description, icon} = data.list[0].weather[0];
    const {speed} = data.list[0].wind;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

    const needDataObj = {
        iconUrl,
        temp, 
        feels_like, 
        pressure, 
        sea_level, 
        humidity,
        main, 
        description,
        speed,
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
   /* data.list.map(objWeather => {
        console.log(objWeather.dt_txt);
    });*/
   
}

async function getDataFromApi(city) {
    let data = await fetch(`http://api.openweathermap.org/data/2.5//forecast?q=${city}&APPID=8404e484fd35ab1089ddcd4ce507e732`).then(response => {
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
