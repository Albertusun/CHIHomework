const charactersDiv = document.getElementById("characters");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentPageSpan = document.getElementById("currentPage");
let currentPage = 1;
let totalPages = 0;

async function fetchData(page) {
    try {
        charactersDiv.innerHTML = "Loading...";

        const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        const data = await response.json();
        totalPages = data.info.pages;
        displayCharacters(data.results);

        currentPageSpan.textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    } catch (error) {
        charactersDiv.innerHTML = "Error loading data";
        console.error(error);
    }
}

function displayCharacters(characters) {
    charactersDiv.innerHTML = "";

    characters.forEach((character) => {
        const characterDiv = document.createElement("div");
        characterDiv.classList.add("character");
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
            <p>${character.status}</p>
        `;
        charactersDiv.appendChild(characterDiv);
    });
}

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchData(currentPage);
    }
});

fetchData(currentPage);
