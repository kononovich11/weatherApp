document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
  });

//Elements
const form = document.querySelector('form'); 
const inputSearch = document.querySelector('.autocompleteSearch');

//work with Form 
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
    //console.log(data);
    const card = document.querySelector('.card');
    const cardTitle = document.createElement('h3');

    cardTitle.textContent = data.name;
    card.appendChild(cardTitle);
    const {main, description, icon} = data.weather[0];
    const needDataObj = {
        main, 
        description, 
        icon,
    };

    for(let key in needDataObj) {
        console.log(`${key}: ${needDataObj[key]}`);
        const rowWeather = document.createElement('p');
        rowWeather.textContent = `${key}: ${needDataObj[key]}`;
        card.appendChild(rowWeather);
    }

}

 async function getDataFromApi(city) {
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8404e484fd35ab1089ddcd4ce507e732`)
    .then(response => {
        return response.json();
    })
    .then(dataObj => {
       return dataObj;
    })
    .catch(err => {
        console.log(err);
    });
    
    getObjAllData(data);
} 


function getObjAllData(data) {
    createElementsOfCard(data)

}


