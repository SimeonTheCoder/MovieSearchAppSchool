const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=8106045&t=';

let obj;

async function submitData() {
    let content = document.getElementById('film-title').value;

    let queryString = BASE_URL + content;

    await fetch(queryString)
        .then(result => result.json())
        .then((data) => obj = data);
}

async function visualiseData() {
    let cityInfo = document.getElementById('film-info');
    cityInfo.classList.remove('invisible');
    
    await submitData();

    console.log(obj);

    document.getElementById('film-info-title').innerHTML = obj.Title;
    document.getElementById('film-director').innerHTML = obj.Director;
    document.getElementById('film-year').innerHTML = obj.Year;

    document.getElementById('film-plot').innerHTML = obj.Plot;
    document.getElementById('film-actors').innerHTML = obj.Actors;

    document.getElementById('film-poster').src = obj.Poster;
}