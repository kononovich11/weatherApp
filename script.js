fetch("http://api.openweathermap.org/data/2.5/weather?q=Minsk,by&APPID=8404e484fd35ab1089ddcd4ce507e732")
.then(response => {
	return response.json();
})
.then(dataObj => {
    console.log(dataObj);
})
.catch(err => {
	console.log(err);
});