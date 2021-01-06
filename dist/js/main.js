const load = async function(){
    const res = await $.get('/api/pokemons/insert_all');
    console.log(res);
}

const ex2 = async function(){
    //fatest pokemon
    const res = await $.get('/api/pokemons/fatest');
    console.log(res);
}

const ex3_findByType = async function(TYPE){
    //fatest pokemon
    const res = await $.get(`/api/pokemons/type/${TYPE}`);
    console.log(res);
}

const ex4_findOwners = async function(NAME){
    //fatest pokemon
    const res = await $.get(`/api/pokemons/owner/${NAME}`);
    console.log(res);
}

const ex5_findRoster = async function(NAME){
    //fatest pokemon
    const res = await $.get(`/api/pokemons/roster/${NAME}`);
    console.log(res);
}

const ex6_mostOwnedPokemon = async function(){
    //fatest pokemon
    const res = await $.get(`/api/pokemons/most_owned`);
    console.log(res);
}


$(function () {
    //load();
    //ex2();
    //ex3_findByType("grass");
    //ex4_findOwners("gengar");
    //ex5_findRoster("Loga");
    ex6_mostOwnedPokemon();
});