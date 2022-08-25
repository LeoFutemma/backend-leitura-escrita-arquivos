const { listarPokemons, detalharPokemon } = require('utils-playground');

async function listarOsPokemons(req, res) {

  try {
    const pokemon = await listarPokemons();
    return res.json(pokemon.results);

  } catch (error) {
    return res.status(400).json(error.meessage);
  }
}


async function detalharUmPokemon(req, res) {
  const { nome } = req.params;

  try {
    const { id, name, height, weight, base_experience, forms, abilities, species } = await detalharPokemon(nome);

    const pokemonEncontrado = { id, name, height, weight, base_experience, forms, abilities, species }

    return res.json(pokemonEncontrado);

  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = { listarOsPokemons, detalharUmPokemon }