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
    //console.log(city);
    getDataFromApi(city);
  })

function getCityName() {
    const inputSearchValue = inputSearch.value;
    return inputSearchValue;
}

async function getDataFromApi(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8404e484fd35ab1089ddcd4ce507e732`)
    .then(response => {
        return response.json();
    })
    .then(dataObj => {
        console.log(dataObj);
    })
    .catch(err => {
        console.log(err);
    });
}  