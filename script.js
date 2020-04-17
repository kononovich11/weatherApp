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

const card = document.querySelector('.card');

function createCardHeader(data) {
    const containerCards = document.querySelector('.containerForCards');

    card.innerHTML ='';

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('cardHeader');
  
    const cardTitle = document.createElement('h3');
    const cardDate = document.createElement('h4');

    const btnNextDays = document.createElement('btn');
    btnNextDays.textContent = 'Show next days';
    btnNextDays.classList.add('btn');

    cardTitle.textContent = data.city.name;

    //Date
    const currentDateObj = new Date();
    const fullNumberDate = data.list[0].dt_txt.slice(0,10); 
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const currentFullDate = `${days[currentDateObj.getDay()]}, ${fullNumberDate}`;
    const firstHalf = days.slice(currentDateObj.getDay() + 1);
    const secondHalf = days.slice(0, currentDateObj.getDay());
    const changedArr = [...firstHalf, ...secondHalf];
    
    cardDate.textContent = currentFullDate;
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardDate);
    cardHeader.appendChild(btnNextDays);
    card.appendChild(cardHeader);
    createElementsOfCard(data, fullNumberDate);

    containerCards.appendChild(card);
    
    btnNextDays.addEventListener('click', (e) => {
        e.preventDefault();
        generateSmallCards(data, fullNumberDate, changedArr)
    });
}

function createElementsOfCard(data, fullNumberDate) { 

    data.list.map((objWeather, i) => {

        if((fullNumberDate) == objWeather.dt_txt.slice(0,10)) {

            const cardWeatherTime = document.createElement('div');
            cardWeatherTime.classList.add('cardWeatherTime');
            
            const Time =  data.list[i].dt_txt.slice(11,16);
            const currentDayInfoObj = data.list[i];
        
            const {temp, humidity} = data.list[i].main;
            const {main, description, icon} = data.list[i].weather[0];
            const {speed} = data.list[i].wind;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            
            const temperature = Math.round(temp - 273.15);
            const needDataObj = {
                Time,
                iconUrl,
                temperature, 
                humidity,
                main, 
                description,
                speed,
            };
            console.log(temp);
            for (let key in needDataObj) {
                if (key == 'iconUrl') {
                    const img = document.createElement('img');
                    img.src = iconUrl;
                    cardWeatherTime.appendChild(img);
                } else {
                    const rowWeather = document.createElement('p');
                    rowWeather.textContent = `${key}: ${needDataObj[key]}`;
                    cardWeatherTime.appendChild(rowWeather);
                }
            }
            card.appendChild(cardWeatherTime);
        }
    });
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
    createCardHeader(data);
}


function generateSmallCards(data, fullNumberDate, changedArr) {

    const rowForSmallCards = document.querySelector('.containerForSmallCards');

    rowForSmallCards.innerHTML = '';

    let countIndex = 0;
    data.list.forEach((weatherObjHour) => {

        if(fullNumberDate != weatherObjHour.dt_txt.slice(0,10) && weatherObjHour.dt_txt.slice(11,13) == '12'){
            
            console.log(weatherObjHour,weatherObjHour.weather[0].icon, changedArr[countIndex]);
            const iconUrlImg = `http://openweathermap.org/img/wn/${weatherObjHour.weather[0].icon}@2x.png`

            const smallCard = document.createElement('div');
            smallCard.classList.add('smallCard');
            smallCard.classList.add('light-green');
            smallCard.classList.add('lighten-2');

            const titleSmallCard = document.createElement('p');
            titleSmallCard.textContent = changedArr[countIndex];
            
            const imgIcon = document.createElement('img');
            imgIcon.src =  iconUrlImg; 

            const temp = document.createElement('p');
            temp.textContent =`temperature: ${Math.round(weatherObjHour.main.temp- 273.15)}`;

            smallCard.appendChild(titleSmallCard);
            smallCard.appendChild(imgIcon);
            smallCard.appendChild(temp);

            rowForSmallCards.appendChild(smallCard);
            ++countIndex;
        }
    });
}