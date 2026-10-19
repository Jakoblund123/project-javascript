
const movieCards = [
    {
        img: "hail-mary.jpg",
        title: "Hail mary",
        genre: "Space",
        director: "Ridley Scott",
        description: "Hail Mary – An astronaut wakes up alone on a spaceship with no memory of who he is or why he is there. As his memories slowly return, he realizes that he has been given a mission that could determine the future of humanity.",
        placeholder: "About the movie:",
        year: 2024
    },
    {
        img: "interstellar.jpg",
        title: "Interstellar",
        genre: "Space",
        director: "Christopher Nolan",
        description: "Interstellar – As Earth becomes increasingly difficult to live on, a group of astronauts travels through a mysterious wormhole in search of a new home for humanity. Along the way, they face dangerous worlds, difficult choices, and the strange effects of time and space.",
        placeholder: "About the movie:",
        year: 2014
    },
    {
        img: "prometheus.jpg",
        title: "Prometheus",
        genre: "Space",
        director: "Ridley Scott",
        description: "Prometheus – A team of scientists travels to a distant planet after discovering clues that may reveal the origins of humanity. However, their search for answers leads them to a terrifying discovery that could put their lives in danger.",
        placeholder: "About the movie:",
        year: 2012
    },
    {
        img: "the-shining.jpg",
        title: "the Shining",
        genre: "Horror",
        director: "Stanley Kubrick",
        description: "The Shining – Jack Torrance takes a job as the winter caretaker of an isolated hotel and moves there with his wife and son. As the hotel becomes completely cut off from the outside world, strange supernatural events begin to affect Jack and his family.",
        placeholder: "About the movie:",
        year: 1980
    },{
        img: "conjuring.jpg",
        title: "The Conjuring",
        genre: "Horror",
        director: "James Wan",
        description: "The Conjuring – A family moves into an old house and soon begins experiencing terrifying and unexplained events. They turn to paranormal investigators for help, who discover that a dark supernatural presence may be connected to the house.",
        placeholder: "About the movie:",
        year: 2013
    },{
        img: "sinister.jpg",
        title: "Sinister",
        genre: "Horror",
        director: "Scott Derrickson",
        description: "Sinister – A crime writer moves his family into a new house while researching his next book. When he discovers a collection of disturbing home movies showing brutal murders, he begins investigating their connection and uncovers a terrifying supernatural mystery.",
        placeholder: "About the movie:",
        year: 2012
    }
]

const mobileIcon = document.querySelector(".nav-toggle");

mobileIcon.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav");
    navLinks.classList.toggle("show");
    
});
const movieForm = document.getElementById("movie-form");

movieForm.addEventListener("submit", (e) => {
    let formData = new FormData(movieForm);
    const movieCardsContainer = document.querySelector(".movie-cards");
    e.preventDefault();
    const image = formData.get("img");
    const imageUrl = URL.createObjectURL(image);
    
    const newMovie = {
        title: formData.get("movie-title"),
        genre: formData.get("movie-genre"), 
        year: formData.get("movie-year"),
        director: formData.get("movie-director"),
        description: formData.get("movie-description"),
        img: imageUrl,
        placeholder: "About the movie:"
    };
    movieCards.push(newMovie);
    const card = createCard(newMovie);
    movieCardsContainer.appendChild(card);

});


 function createHeader() {
    const movieHeader = document.createElement("div");
    movieHeader.classList.add("movie-header")
    movieHeader.innerHTML = `
    <h2>Great Movies</h2>
    <select id="movie-genre">
        <option value="all">All Genres</option>
        <option value="Space">Space</option>
        <option value="Horror">Horror</option>
    </select>
    `;
     const movieCardsContainer = document.querySelector(".movie-cards");
    movieCardsContainer.insertAdjacentElement("beforebegin",movieHeader);

    const genreSelect = document.getElementById("movie-genre");

    genreSelect.addEventListener("change", () => {
    const selectedGenre = genreSelect.value;

    const filteredMovies = movieCards.filter(movie => {
        return selectedGenre === "all" || movie.genre === selectedGenre;
    });

    displayCards(filteredMovies);
});
   
 }

function createCard(forEveryMovie) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `

    <div class="card-front">
        <img src="${forEveryMovie.img}" alt="${forEveryMovie.title}">
        <h2>${forEveryMovie.title}</h2>
        <p>Genre: ${forEveryMovie.genre}</p>
        <p>Director: ${forEveryMovie.director}</p>
        <button class="remove-card" onclick="removeCards(this)">Remove Card</button>
       
        </div>
    <div class="card-back">
        <h2>Release Year: ${forEveryMovie.year}</h2>
        <h3>${forEveryMovie.placeholder}</h3>
        <p> ${forEveryMovie.description}</p>
        </div>
    `;

    card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    });

    return card;

}

function displayCards(filteredMovies) {
    
    const movieCardsContainer = document.querySelector(".movie-cards");
    movieCardsContainer.innerHTML = "";
    
    filteredMovies.forEach(selectedMovie => {
        let cards = createCard(selectedMovie);
        movieCardsContainer.appendChild(cards);
    });
}



function removeCards(button) {
    const card = button.closest(".card");
    const title = card.querySelector("h2").textContent;

    const movieIndex = movieCards.findIndex(movie => {
        return movie.title === title;
    });

    if (movieIndex !== -1) {
        movieCards.splice(movieIndex, 1);
    }

    card.remove();
}

createHeader();
displayCards(movieCards);
