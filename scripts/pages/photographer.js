import {arrowUp} from '../utils/layout.js';
import {Lightbox} from '../utils/ligthbox.js';
import {photographerPageFactory} from '../factories/medias.js';

// AFFICHER HEADER
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        const photographerModel = photographerPageFactory(photographer);
        const userCardDOM = photographerModel.banierePhotographer;
        photographersSection.appendChild(userCardDOM);
    });
}
// RETOURNER L'AFFICHAGE
const init = async () => {
    await photographerPageFactory();
    Lightbox.init();
};

init();
arrowUp();

