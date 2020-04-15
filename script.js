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

function createElementsOfCard(data) { // console.log(data);
    const card = document.querySelector('.card');
    const cardTitle = document.createElement('h3');

    cardTitle.textContent = data.name;
    card.appendChild(cardTitle);
    const {main, description, icon} = data.weather[0];
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const needDataObj = {
        main,
        description,
        iconUrl
    };

    for (let key in needDataObj) {
        if (key == 'iconUrl') {
            const img = document.createElement('img');
            img.src = iconUrl;
            card.appendChild(img);
            console.dir(img);
        } else {
            console.log(`${key}: ${needDataObj[key] }`);
            const rowWeather = document.createElement('div');
            rowWeather.textContent = `${key}: ${
                needDataObj[key]
            }`;
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
