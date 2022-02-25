const button = document.querySelector(".search-button");
const detail = document.querySelector(".modal-ditail");
let content = document.querySelectorAll(".col-md-4 my-5")
let input = document.querySelector(".search")

button.addEventListener("click", async function (){
    try{
        const inputkey = document.querySelector('.search')
        const movies = await getMovies(inputkey.value)
        updateUI(movies)
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", afterLoaded)
        }else{
            (async function afterLoaded(){
                let content = await document.getElementById("movie")
                let error = await document.querySelector("center")
                if(content.style.display = "block"){
                    error.style.display = "none"
                }
            })()
        }
    }catch(error){
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", afterLoaded)
        }else{
            (async function afterLoaded(){
                let content = await document.getElementById("movie")
                if(content.style.display == "block"){
                    for(let i = 0; i < document.querySelectorAll("#movie").length; i++){
                        document.querySelectorAll("#movie")[i].style.display = "none"
                    }
                }
            })()
        }
        document.getElementById("error").innerHTML = error;
        document.getElementsByTagName("center")[0].style.display = "block";
    }
}) 
document.getElementsByTagName("input")[0].addEventListener("keyup", async function(e){
    try{
        const inputkey = document.querySelector('.search')
        const movies = await getMovies(inputkey.value)
        updateUI(movies)
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", afterLoaded)
        }else{
            (async function afterLoaded(){
                let content = await document.getElementById("movie")
                let error = await document.querySelector("center")
                if(content.style.display = "block"){
                    error.style.display = "none"
                }
            })()
        }
    }catch(error){
        if(document.readyState === "loading"){
            document.addEventListener("DOMContentLoaded", afterLoaded)
        }else{
            (async function afterLoaded(){
                let content = await document.getElementById("movie")
                if(!content.style.display == "block"){
                    for(let i = 0; i < document.querySelectorAll("#movie").length; i++){
                        document.querySelectorAll("#movie")[i].style.display = "none"
                    }
                }
            })()
        }
        document.getElementById("error").innerHTML = error;
        document.getElementsByTagName("center")[0].style.display = "block";
    }
})

document.addEventListener("click", async function(e){
    if(e.target.classList.contains("modal-ditail")){
        const id = e.target.dataset.id
        const mvDetail = await  getMoviesDetail(id);
        updateUIDetail(mvDetail)
    }
})
function getMoviesDetail(dataId) {  
    return fetch(`http://www.omdbapi.com/?apikey=e02efdd1&i=${dataId}`)
        .then(response => response.json())
        .then(m => m);
    
}
function updateUIDetail(e){
    const movieDetail = showMovieDetail(e);
    $('.modal-body').html(movieDetail);
}

function getMovies(keyword){
    return fetch(`http://www.omdbapi.com/?apikey=e02efdd1&s=${keyword}`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if(response.Response === "False"){
                throw new Error(response.Error)
            }
            return response.Search
        })
}
function updateUI(movies){
    let cards = '';
    movies.forEach(m => {
        cards += `<div id="movie" class="col-md-4 my-5" style="display: block;">
                    <div class="card">
                        <img src='${m.Poster}' class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <a class="btn btn-primary modal-ditail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${m.imdbID}">
                            Show Detail</a>
                        </div>
                    </div>
                </div>`;
    })
    $('#movie-container').html(cards);
}

function showMovieDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" alt='${m.Title}' class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title} (${m.Year})</h4>
                            </li>
                            <li class="list-group-item"><strong>Tittle : </strong>${m.Title}</li>
                            <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                            <li class="list-group-item"><strong>Directors : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>  
                            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Plot : </strong>${m.plot}</li>
                            <li class="list-group-item"><strong>Awards : </strong>${m.Awards}</li>
                        </ul>
                    </div>                            
                </div>                       
            </div>`;
}

