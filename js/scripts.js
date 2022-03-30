// IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  let modalContainer = document.querySelector('#modal-container');

  // Public functions
  // Adds and validates objects

  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
    'name' in pokemon &&
    'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('incorrect');
    }
  }

  function getAll () {
    return pokemonList;
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener ("click", function (event) {
      showDetails(pokemon);
    });
  }

  // Gets and creates list from pokeapi
  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  // Gets data from item url

  async function loadDetails (item) {
    let url = item.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      // Adds the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      console.error(e);
    }
  }

  // Shows details in console form load function
  function showDetails (item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(pokemon) {

    modalContainer.innerHTML = " ";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X"
    closeButtonElement.addEventListener("click", hideModal);


    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = pokemon.height;

    // let secondElement = document.createElement('p');
    // secondElement.setAttribute (pokemon.types);

    let imageElement = document.createElement("img");
    imageElement.classList.add("image-class");
    imageElement.setAttribute ("src", pokemon.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    //  modal.appendChild(secondElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }
  /*  document.querySelector('button').addEventListener('click', () => {
  showModal();
});
  }  */
  function hideModal () {
    modalContainer.classList.remove("is-visible");
}
  window.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
