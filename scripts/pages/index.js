	import {photographerFactory} from '../factories/photographer.js';;
	import {arrowUp,getData} from '../utils/layout.js';

	// AFFICHER LES PHOTOGRAPHES 
	async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.article;
            photographersSection.appendChild(userCardDOM);
        });
    }
	
	// RETOURNER L'AFFICHAGE
	const init = async () => {
		const { photographers } = await getData();
		displayData(photographers);
	};
	init();
	// ARROW UP 
	arrowUp()
