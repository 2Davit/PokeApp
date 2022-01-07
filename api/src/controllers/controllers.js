const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApi = async () => {
  let eachPokeReq = [];
  let pokemons = [];

  for (let i = 1; i < 41; i++) {
    eachPokeReq.push(
      // axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 386)}/` //Pokemons al azar entre las primeras 3 generaciones)
      axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`) // Traer pokemons random traía problemas de consistencia :(
    );
  }

  const response = await Promise.all(eachPokeReq);

  response.forEach((res) => {
    pokeData = res.data;
    pokemons.push({
      id: pokeData.id,
      name: pokeData.name,
      health: pokeData.stats[0].base_stat,
      attack: pokeData.stats[1].base_stat,
      defense: pokeData.stats[2].base_stat,
      speed: pokeData.stats[5].base_stat,
      height: pokeData.height,
      weight: pokeData.weight,
      img:
        pokeData.sprites.other.dream_world.front_default ||
        pokeData.sprites.other.home.front_default,
    });
  });

  return pokemons;
};

const getDb = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
    },
  });
};

const getPoke = async () => {
  const apiPokes = await getApi();
  const dbPokes = await getDb();
  return apiPokes.concat(dbPokes);
};

const getTypes = async () => {
  const { data: type } = await axios.get("https://pokeapi.co/api/v2/type");
  type.results.forEach((ty) => {
    Type.create({
      name: ty.name,
    });
  });
};

module.exports = { getPoke, getApi, getDb, getTypes };
