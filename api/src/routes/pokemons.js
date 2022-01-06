const { Router } = require("express");
const { getPoke } = require("../controllers/controllers");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const pokemons = await getPoke();

  if (name) {
    const poke = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
    if (poke.length > 0) return res.status(200).send(poke[0]);
    return res.status(404).send({ message: "Pokemon not found" });
  }

  res.status(200).send(pokemons);
});

router.get("/:id", async (req, res) => {
  const pokemons = await getPoke();
  const { id } = req.params;
  const poke = pokemons.filter((pokemon) => pokemon.id.toString() === id);
  if (poke.length > 0) return res.status(200).send(poke[0]);
  res.status(404).send({ message: "Pokemon not found" });
});

module.exports = router;
