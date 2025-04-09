const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=8106045&t=';

let favorites = [];

if (localStorage.getItem('favoritesMovies') != null) {
    favorites = JSON.parse(localStorage.getItem('favoritesMovies'));

    readFavoriteMovies();
}

let obj;
let counter = favorites.length;

function renderFavoriteMovie(currMovie, id) {
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
    btnView.style.margin = '0px';

    div2.appendChild(filmTitle);

    div2.appendChild(btnRemove);
    div2.appendChild(btnView);

    div.appendChild(poster);
    div.appendChild(div2);

    baseDiv.appendChild(div);
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

async function visualiseData() {
    let cityInfo = document.getElementById('film-info');
    cityInfo.classList.remove('invisible');
    
    await submitData();

    document.getElementById('film-info-title').innerHTML = obj.Title;
    document.getElementById('film-director').innerHTML = obj.Director;
    document.getElementById('film-year').innerHTML = obj.Year;

    document.getElementById('film-plot').innerHTML = obj.Plot;
    document.getElementById('film-actors').innerHTML = obj.Actors;

    document.getElementById('film-poster').src = obj.Poster;
}

function addToFavorites() {
    favorites.push(obj);

    localStorage.setItem("favoritesMovies", JSON.stringify(favorites));

    renderFavoriteMovie(counter++);
}

function removeFromFavorites(e) {
    let index = favorites[e.target.id.substring(6)];
    console.log(index);

    favorites.splice(index, 1);

    localStorage.setItem("favoritesMovies", JSON.stringify(favorites));
}