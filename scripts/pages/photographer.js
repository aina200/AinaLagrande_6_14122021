// RECUPERATION DE L'ID DE LA PAGE 
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");



// let dato = await fetch(`./data/photographers.json/${id}`);


const idPhotographerSelected =getDatas.find((element) => element.id == id);

console.log(idPhotographerSelected)
