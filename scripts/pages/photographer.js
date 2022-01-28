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

    const selectedMediaData = media.filter(
		(media) => media.photographerId == id
	);

    // FUNCTION POUR FABRIQUER HEADER HTML 
    function photographerPageFactory(data) {
        const { name ,city,country,tagline,portrait,image,title} = data;
    
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
            // const mediaLinkImg = `assets/media/${selectedMediaData.image}`
            const altPictures = selectedMediaData.title



            // MEDIAS 
            selectedMediaData.forEach((element)=>{
                const media = document.createElement( 'article' );
                const mediaA = document.createElement( 'a' );
                const mediaImg =  document.createElement( 'img' );
                const mediaTitle = document.createElement( 'p' );
                mediaImg.classList.add('media_content');
                mediaImg.setAttribute("src", `assets/media/${element.image}`);
                mediaImg.setAttribute("alt", element.title);
                // mediaTitle.textContent = element.title;
                mediaTitle.innerHTML='<p>GSDISBDH</p>'
                mediaBox.appendChild(media);
                media.appendChild(mediaA);
                mediaA.appendChild(mediaImg);
                mediaA.appendChild(mediaTitle);

            })

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

            // Inherit Element
            banierePhotographer.appendChild(photographerDescription);
            photographerDescription.appendChild(photographerName);
            photographerDescription.appendChild(photographerCity);
            photographerDescription.appendChild(photographerSlogan);
            banierePhotographer.appendChild(contactButton);
            banierePhotographer.appendChild(photographerImg);
            banierePhotographer.appendChild(mediaTitle);
            return (banierePhotographer);
        }
        return {name,city,country,tagline,portrait,image,title,getPhotographerPageDOM }
        
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

