const charactersDiv = document.getElementById('characters');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalStatus = document.getElementById('modalStatus');
const closeModal = document.getElementById('closeModal');
let currentPage = 1;
let totalPages = 0;
let loading = false;

async function fetchData(page) {
    if (loading) return;
    loading = true;

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const data = await response.json();
        totalPages = data.info.pages;
        displayCharacters(data.results);
    } catch (error) {
        charactersDiv.innerHTML = 'Error loading data';
        console.error(error);
    }

    loading = false;
}

function displayCharacters(characters) {
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.dataset.id = character.id;
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
            <p>${character.status}</p>
        `;
        charactersDiv.appendChild(characterDiv);
    });
}

charactersDiv.addEventListener('click', async (e) => {
    if (e.target.closest('.character')) {
        const characterDiv = e.target.closest('.character');
        const characterId = characterDiv.dataset.id;
        openModal(characterId);
    }
});

async function openModal(characterId) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const character = await response.json();

        modalImage.src = character.image;
        modalName.textContent = character.name;
        modalStatus.textContent = character.status;

        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching character details:', error);
    }
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && currentPage < totalPages) {
        currentPage++;
        fetchData(currentPage);
    }
});

fetchData(currentPage);
