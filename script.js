const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=8106045&t=';

let favorites = [];
let html = [];

if (localStorage.getItem('favoritesMovies') != null) {
    favorites = JSON.parse(localStorage.getItem('favoritesMovies'));

    readFavoriteMovies();
}

let obj;
let counter = favorites.length;

function renderFavoriteMovie(currMovie, id) {
    console.log(currMovie);
    
    let baseDiv = document.getElementById('fave-mvs');

    let div = document.createElement('div');
    div.classList.add('container-favorites');

    let poster = document.createElement('img');
    poster.src = currMovie.Poster;

    let div2 = document.createElement('div');
    div2.style.display = 'inline';
    div2.style.width = '90%';

    let filmTitle = document.createElement('h3');
    filmTitle.innerHTML = currMovie.Title;
    filmTitle.style.margin = '10px';
    filmTitle.style.fontSize = '24px';

    let btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';
    btnRemove.id = 'remove' + id;
    btnRemove.style.margin = '0px';
    btnRemove.addEventListener("click", removeFromFavorites);

    let btnView = document.createElement('button');
    btnView.textContent = 'View';
    btnView.id = 'view' + id;
    btnView.style.margin = '0px';
    btnView.addEventListener("click", showFromFavorites);

    div2.appendChild(filmTitle);

    div2.appendChild(btnRemove);
    div2.appendChild(btnView);

    div.appendChild(poster);
    div.appendChild(div2);

    baseDiv.appendChild(div);

    html.push(div);
}

function readFavoriteMovies() {
    // <div class="container-favorites" id="film-info">
    //     <img id="film-poster" src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg">
        
    //     <div style="display: inline; width: 90%;">
    //         <h3 id="film-info-fave-title1">AEUUEH</h3>
    //     </div>  
    // </div>
    let baseDiv = document.getElementById('fave-mvs');

    let favePrev = baseDiv.childNodes;

    for (let i = 0; i < favorites.length; i ++)
        renderFavoriteMovie(favorites[i], i);
}

async function submitData() {
    let content = document.getElementById('film-title').value;

    let queryString = BASE_URL + content;

    await fetch(queryString)
        .then(result => result.json())
        .then((data) => obj = data);
}

async function getData() {
    await submitData();
    visualiseData(obj);
}

async function visualiseData(movie) {
    let cityInfo = document.getElementById('film-info');
    cityInfo.classList.remove('invisible');

    document.getElementById('film-info-title').innerHTML = movie.Title;
    document.getElementById('film-director').innerHTML = movie.Director;
    document.getElementById('film-year').innerHTML = movie.Year;

    document.getElementById('film-plot').innerHTML = movie.Plot;
    document.getElementById('film-actors').innerHTML = movie.Actors;

    document.getElementById('film-poster').src = movie.Poster;
}

function addToFavorites() {
    console.log(obj);

    favorites.push(obj);

    localStorage.setItem("favoritesMovies", JSON.stringify(favorites));

    counter++;

    renderFavoriteMovie(obj, counter - 1);
}

function removeFromFavorites(e) {
    let index = favorites.indexOf(favorites[e.target.id.substring(6)]);
    console.log(index);

    favorites.splice(index, 1);

    let baseDiv = document.getElementById('fave-mvs');
    baseDiv.removeChild(html[index]);

    html.splice(index, 1);

    localStorage.setItem("favoritesMovies", JSON.stringify(favorites));
}

function showFromFavorites(e) {
    let movie = favorites[e.target.id.substring(4)];
    visualiseData(movie);
}