const getData = () => fetch("./data/photographers.json", {mode: 'no-cors'})
  .then(res => res.json())
  .catch(err => console.log("An error occurs when fetching photographers", err))


    // AFFICHER LE PHOTOGRAPHE SELECTIONNE 

  async function displayPhotographerData() {
	const { media, photographers } = await getData();
    // RECUPERER L'ID DU PHOTOGRAPHE SELECTIONNE
	const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const id = urlSearchParams.get("id");
    // METTRE LE PHOTOGRAPHE DS UNE VARIABLE 
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id == id
	);

    // FUNCTION POUR FABRIQUER HTML 
    function photographerPageFactory(data) {
        const { name } = data;
    
        function getPhotographerPageDOM() {
            const banierePhotographer = document.querySelector('.photograph-header')
            const photographerName= document.createElement( 'h2' );
            // const name = selectedPhotographerData.name
            photographerName.textContent = name;
            
            banierePhotographer.appendChild(photographerName);
            console.log(photographerName)
            return (banierePhotographer);
        }
        return { name, getPhotographerPageDOM }
        
    }

    // AFFICHER HTML 
	async function displayData(photographers) {
        const photographersSection = document.querySelector(".photograph-header");

        photographers.forEach((photographer) => {
            const photographerModel = photographerPageFactory(photographer);
            const userCardDOM = photographerModel.getPhotographerPageDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    // RETOURNER L'AFFICHAGE
	const init = async () => {
		const { photographers } = await getData();
		displayData(photographers);
	};
	init();

}
displayPhotographerData()


// function test() {

//     const banierePhotographer = document.querySelector('.photograph-header')
//     const photographerName= document.createElement( 'h2' );
//     const name = selectedPhotographerData.name
//     photographerName.textContent = name;
//     banierePhotographer.appendChild(photographerName);

//     return banierePhotographer

// }

// function photographerFactory(data) {
//     const { name } = data;

//     function getUserCardDOM() {
//         const banierePhotographer = document.querySelector('.photograph-header')

//         const photographerName= document.createElement( 'h2' );

//         photographerName.textContent = name;


//         banierePhotographer.appendChild(photographerName);

//         return (article);

//     }
//     return { name, getUserCardDOM }
// }

