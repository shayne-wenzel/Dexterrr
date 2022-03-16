// IIFE
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      type: ['grass', 'poison']
    },

    {
      name: 'Charmilion',
      height: 1.1,
      weight: 19,
      type: ['fire']
    },

    {
      name: 'Dratini',
      height: 1.8,
      weight: 3.3,
      type: ['dragpn']
    },

    {
      name: 'Rayquaza',
      height: 7,
      weight: 206.5,
      type: ['dragon']
    }
  ]
  // Public functions
  function add (pokemon) {
    pokemonList.push(pokemon)
  }

  function getAll () {
    return pokemonList
  }
  // Shows pokemon name when cllicked
  function showDetails (pokemon) {
    console.log(pokemon.name)
  }

  function addListener (button, pokemon) {
    button.addEventListener ("click", function () {
      showDetails(pokemon)
    })
  }
  // Adds pokemon to ul as buttons
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    addListener(button, pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  }
})();
// Updated forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});
