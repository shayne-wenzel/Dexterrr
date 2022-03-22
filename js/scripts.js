// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // Public functions
  // Adds and validates objects
  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
    'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll () {
    return pokemonList;
  }

  function addListener (button, pokemon) {
    button.addEventListener ('click', function () {
      showDetails(pokemon);
    });
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    addListener(button, pokemon);
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
  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
    // Adds the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Shows details in console form load function
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetaills: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
