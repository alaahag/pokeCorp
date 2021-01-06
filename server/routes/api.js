const pokemons = require('../pokemons.json');
const express = require('express'),
sequelize = require('sequelize'),
router = express.Router(),
seq = new sequelize(process.env.URI);

router.get('/pokemons/insert_all', function(req, res){
	try {
		//id name type height weight ownedBy
		let pokemonTypes = new Set();
		let towns = new Set();
		let trainers = new Map();

		//first we need to fill the pokemon types
		for (let p of pokemons) {
			pokemonTypes.add(p.type);
			for (let owner of p.ownedBy) {
				trainers.set(owner.name, owner.town);
				towns.add(owner.town);
			}
		}

		let pokemonTypesArray = Array.from(pokemonTypes);
		let townsArray = Array.from(towns);
		let trainersArray = Array.from(trainers);

		for (let i=0; i<pokemonTypesArray.length; i++) {
			seq.query(`INSERT INTO pokemonType VALUES (${i}, '${pokemonTypesArray[i]}')`);
		}

		for (let i=0; i<townsArray.length; i++) {
			seq.query(`INSERT INTO town VALUES (${i}, '${townsArray[i]}')`);
		}

		for (let i=0; i<trainersArray.length; i++) {
			seq.query(`INSERT INTO trainer VALUES (${i}, '${trainersArray[i][0]}', ${townsArray.indexOf(trainersArray[i][1])})`);
		}

		for (let p of pokemons) {
			seq.query(`INSERT INTO pokemon VALUES (${p.id}, '${p.name}', ${pokemonTypesArray.indexOf(p.type)} , ${p.height}, ${p.weight})`);
			for (let owned of p.ownedBy) {
				seq.query(`INSERT INTO pokemonTrainer VALUES (${p.id}, ${trainersArray.findIndex(f => f[0] === owned.name)})`);
			}
		}

		return true;
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/pokemons/fatest', async function(req, res){
	try {
		let results = await seq.query('SELECT name, weight FROM pokemon WHERE weight = (SELECT MAX(weight) FROM pokemon)');
		const rows = JSON.stringify(results[0]);
		console.log(rows);
		res.send(rows);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/pokemons/type/:TYPE', async function(req, res){
	try {
		let results = await seq.query(`SELECT name FROM pokemon,pokemonType WHERE pokemonType.type = "${req.params.TYPE}" AND pokemon.type = pokemonType.id;`);
		// const rows = JSON.stringify(results[0]);
		// console.log(rows);
		res.send(results[0]);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/pokemons/owner/:NAME', async function(req, res){
	try {
		let results = await seq.query(`SELECT trainer.name FROM trainer,pokemonTrainer,pokemon WHERE pokemon.name = "${req.params.NAME}" AND pokemon.id = pokemonTrainer.pokemonID and pokemonTrainer.trainerID = trainer.id GROUP BY trainer.name`);
		// const rows = JSON.stringify(results[0]);
		// console.log(rows);
		res.send(results[0]);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/pokemons/roster/:NAME', async function(req, res){
	try {
		let results = await seq.query(`SELECT pokemon.name FROM trainer,pokemonTrainer,pokemon WHERE trainer.name= "${req.params.NAME}" AND trainer.id = pokemonTrainer.trainerID and pokemon.id = pokemonTrainer.pokemonID group by pokemon.name`);
		// const rows = JSON.stringify(results[0]);
		// console.log(rows);
		res.send(results[0]);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/pokemons/most_owned', async function(req, res){
	try {
		let results = await seq.query('SELECT COUNT(*),pokemon.name as Number FROM pokemon,pokemonTrainer where pokemon.id = pokemonTrainer.pokemonID GROUP BY pokemonTrainer.pokemonID   ORDER BY COUNT(*) DESC limit 3;');
		// const rows = JSON.stringify(results[0]);
		// console.log(rows);
		res.send(results[0]);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

module.exports = router;