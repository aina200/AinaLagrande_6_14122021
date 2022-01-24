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
    const selectedMediaData = media.find(
		(media) => media.photographerId == id
	);

    
    // for (let i = 0; i < selectedMediaData.image.length; i++) { 
    //     const media = document.createElement( 'article' );
    //     const mediaA = document.createElement( 'a' );
    //     const mediaImg =  document.createElement( 'img' );
    //     mediaImg.classList.add('media_img');
    //     mediaImg.setAttribute("src", mediaLinkImg);
    //     mediaImg.setAttribute("alt", altPictures);
    //     mediaBox.appendChild(media);
    //     media.appendChild(mediaA);
    //     mediaA.appendChild(mediaImg);
    //     // console.log(mediaImg);
    // }
  


    // FUNCTION POUR FABRIQUER HEADER HTML 
    function photographerPageFactory(data) {
        const { name ,city,country,tagline,portrait,image} = data;
    
        function getPhotographerPageDOM() {
            const banierePhotographer = document.querySelector('.photograph-header')
            const photographerDescription= document.createElement('article');
            photographerDescription.classList.add('photographer_description');
            const contactButton = document.querySelector('.contact_button')

            // Create Element 
            const photographerName = document.createElement( 'h2' );
            const photographerCity =  document.createElement( 'h3' );
            const photographerSlogan =  document.createElement( 'p' );
            const photographerImg =  document.createElement( 'img' );
            photographerImg.classList.add('photographer_page_img');
            const mediaBox = document.querySelector('.media_box');
            const mediaLinkImg = `assets/media/${selectedMediaData.image}`
            const altPictures = selectedMediaData.title

            for (let i = 0; i < selectedMediaData.image.length; i++) { 
                const media = document.createElement( 'article' );
                const mediaA = document.createElement( 'a' );
                const mediaImg =  document.createElement( 'img' );
                mediaImg.classList.add('media_img');
                mediaImg.setAttribute("src", mediaLinkImg);
                mediaImg.setAttribute("alt", altPictures);
                mediaBox.appendChild(media);
                media.appendChild(mediaA);
                mediaA.appendChild(mediaImg);
                // console.log(mediaImg);
            }
          

            // Defind Element 
            const name = selectedPhotographerData.name
            const city = selectedPhotographerData.city
            const country = selectedPhotographerData.country
            const tagline = selectedPhotographerData.tagline
            const picture = `assets/photographers/${selectedPhotographerData.portrait}`
            const alt = "portrait de photographe"
            

            // Fill Element 
            photographerName.textContent = name;
            photographerCity.textContent = city+ ', ' +country;
            photographerSlogan.textContent = tagline;
            photographerImg.setAttribute("src", picture);
            photographerImg.setAttribute("alt", alt);
            // mediaImg.setAttribute("src", mediaLinkImg);
        
            

            // Inherit Element
            banierePhotographer.appendChild(photographerDescription);
            photographerDescription.appendChild(photographerName);
            photographerDescription.appendChild(photographerCity);
            photographerDescription.appendChild(photographerSlogan);
            banierePhotographer.appendChild(contactButton);
            banierePhotographer.appendChild(photographerImg);
            // mediaImgLink.appendChild(mediaImg);
            // banierePhotographer.appendChild(mediaTitle);
            return (banierePhotographer);
        }
        return {name,city,country,tagline,portrait,image,getPhotographerPageDOM }
        
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

