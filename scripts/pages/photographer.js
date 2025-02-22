import {getData,arrowUp} from '../utils/layout.js';
import {Lightbox} from '../utils/ligthbox.js';
import {filterByOption} from '../utils/filters.js';

const { media, photographers } = await getData();
// RECUPERER L'ID DU PHOTOGRAPHE SELECTIONNE
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

const selectedPhotographerData = photographers.find(
    (photographer) => photographer.id == id
);
// // RECUPERER LES MEDIAS DU PHOTOGRAPHE SELECTIONNE
let selectedMediaData = media.filter(
    (media) => media.photographerId == id
);
document.title += `-${selectedPhotographerData.name}`;

// HEADER HTML 
 async function photographerPageFactory() {
    // AFFICHER LE PHOTOGRAPHE SELECTIONNE 
        const {name ,city,country,tagline,portrait,image,title} = await getData();
    
        const banierePhotographer = document.querySelector('.photograph-header');
        const photographerDescription= document.createElement('article');
        photographerDescription.setAttribute('aria-label', 'description');
        photographerDescription.classList.add('photographer_description');
        const contactButton = document.querySelector('.contact_button');

        // Create Element 
        const photographerName = document.createElement( 'h2' );
        const photographerCity =  document.createElement( 'h3' );
        const photographerSlogan =  document.createElement( 'p' );
        const photographerImg =  document.createElement( 'img' );
        photographerImg.classList.add('photographer_page_img');
        const mediaBox = document.querySelector('.media_box');

        // MEDIAS 
         function mediaHtmlCreate(){
            selectedMediaData.forEach((element)=>{
                let media = document.createElement( 'article' );
                if (element.image) {  
                    media.innerHTML=`
                    <img src="assets/media/${element.image}" class="media_content" alt="${element.title} vue rapprochée">
                    <aside class="media_description">
                        <p>${element.title}</p>
                        <span class="likes_box" aria-label="container pour les "j'aimes"">
                            <p class="chiffre_like_for_photo">${element.likes}</p>
                            <i class="heart fas fa-heart like fa-2x" aria-label="icone en forme de coeur"></i>
                        </span>
                    </aside>
                `;
                mediaBox.appendChild(media);
                } else if (element.video) {
                    media.innerHTML=`
                    <video controls class="media_content" tabindex="5" aria-label="${element.title}">
                        <source src="assets/media/${element.video}"type="video/mp4"/>
                    </video>
                    <aside class="media_description">
                        <p>${element.title}</p>
                        <span class="likes_box" aria-label="container pour les "j'aimes"">
                            <p>${element.likes}</p>
                            <i class="heart fas fa-heart like fa-2x" aria-label="icone en forme de coeur"></i>
                        </span>
                    </aside>
                `;
                    mediaBox.appendChild(media);
                } 
                else {
                    throw "Format inconnu";
                }
            }) 
        }
        mediaHtmlCreate();
            
        // FILTER TRIGGER
        document.addEventListener("change", function (event) {
            const option = filterByOption(selectedMediaData, event.target.value);
            mediaBox.innerHTML = "";
            updateMediaGallery(option);
            likeUpdate();
            Lightbox.init();
        });
        function updateMediaGallery() {
            let medias = mediaHtmlCreate();
            media.innerHTML += medias;
        }

        priceForDay.innerHTML = `<p>${selectedPhotographerData.price}€/jour</p>`;
        likesCounter.appendChild(likeTotalSpan);
        likesCounter.appendChild(priceForDay);

        const picture = `assets/photographers/${selectedPhotographerData.portrait}`;
        const alt = `portrait de ${selectedPhotographerData.name}`;

        // Fill Element 
        photographerName.textContent = selectedPhotographerData.name;
        photographerCity.textContent = selectedPhotographerData.city+ ', ' +selectedPhotographerData.country;
        photographerSlogan.textContent = tagline;
        photographerImg.setAttribute("src", picture);
        photographerImg.setAttribute("alt", alt);

        // Inherit Element
        banierePhotographer.appendChild(photographerDescription);
        photographerDescription.appendChild(photographerName);
        photographerDescription.appendChild(photographerCity);
        photographerDescription.appendChild(photographerSlogan);
        banierePhotographer.appendChild(contactButton);
        banierePhotographer.appendChild(photographerImg);

        return {name,city,country,tagline,portrait,image,title,banierePhotographer }
    }

    //FOOTER 
    const likedPhotoIds = [];
    const getTotalLike = () => {
        let totalLike = 0;
        selectedMediaData.forEach((media) => (totalLike += media.likes));
        totalLike += likedPhotoIds.length;
        return totalLike;
    };
     let totalLike = getTotalLike();
     const likesCounter = document.querySelector('.total_likes')
     const likeTotalSpan = document.createElement( 'span' );
     likeTotalSpan.setAttribute('aria-label', 'total de likes');
     const priceForDay =  document.createElement( 'p' );
     priceForDay.setAttribute('aria-label', 'prix par jour');
     likeTotalSpan.innerHTML=`
     <p class="chiffre">${totalLike}</p><i class="heart fas fa-heart like fa-1x"></i>
     `;

    //  LIKES 
    function likeUpdate() {

        
        const buttonLike = document.querySelectorAll('.likes_box');
        const chiffreLikes = document.querySelector('.chiffre');

        buttonLike.forEach(function (i) {
        
            i.addEventListener("click", function () {
                const liked = i.dataset.liked === "true";
                i.dataset.liked = !liked;
                const heart = i.querySelector('.heart');
                const like = i.querySelector('.chiffre_like_for_photo');
                
                if (liked) {
                    heart.style.color = "#DB8876";
                    buttonLike.ariaLabel = "J'aime pas";
                    totalLike--;
                    like.textContent--;
                    chiffreLikes.textContent=totalLike;
    
                } else {
                    heart.style.color = "#901C1C";
                    buttonLike.ariaLabel = "J'aime";
                    totalLike++;
                    like.textContent++;
                    chiffreLikes.textContent=totalLike;
                }                
            })        
        })
    }

// AFFICHER 
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        const photographerModel = photographerPageFactory(photographer);
        const userCardDOM = photographerModel.banierePhotographer;
        photographersSection.appendChild(userCardDOM);
    });
}

const init = async () => {
    await photographerPageFactory();
    likeUpdate();
    Lightbox.init();
};

init();
arrowUp();

