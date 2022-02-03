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

    // FILTERS
    const filterByOption = (selectedMediaData, option) => {
        switch (option) {
            case "popularity":
                return selectedMediaData.sort((a, b) => {
                    return b.likes - a.likes;
                });
            case "date":
                return selectedMediaData.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
            case "title":
                return selectedMediaData.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return selectedMediaData.sort((a, b) => {
                    return b.likes - a.likes;
                });
        }
    };
    
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

            // MEDIAS 
            function mediaHtmlCreate(){
                selectedMediaData.forEach((element)=>{
                    const media = document.createElement( 'article' );
                    if (element.image) {  
                        media.innerHTML=`
                        <a>
                            <img src="assets/media/${element.image}" class="media_content" alt="${element.title}">
                        </a>
                        <aside class="media_description">
                            <p>${element.title}</p>
                            <span class="likes_box">
                                <p>${element.likes}</p>
                                <i class="heart fas fa-heart like fa-2x"></i>
                            </span>
                        </aside>
                    `
                    mediaBox.appendChild(media);
                    } else if (element.video) {
                        media.innerHTML=`
                        <a>
                        <video poster="assets/images/logo.png" controls class="media_content" tabindex="5">
                            <source src="assets/media/${element.video}"type="video/mp4"/>
                        </video>
                        </a>
                        <p>${element.title}</p>
                    `
                        mediaBox.appendChild(media);
                    } else {
                        throw "Unknown Media Type";
                    }
                   
                })
                
            }
            mediaHtmlCreate();

                // FILTER TRIGGER
            document.addEventListener("change", function (event) {
                const option = filterByOption(selectedMediaData, event.target.value);
                console.log(option)
                // updateMediaGallery(option);
                
            });
            // UPDATE MEDIA WITH SELECT 
            function updateMediaGallery(element) {
                // mediaHtmlCreate();
            }
            selectedMediaData.forEach((element)=>{
            function reloadLikes() {
                const likesCounter = document.querySelectorAll('.total_likes')
                likesCounter.textContent = `${element.likes}`
                console.log(likesCounter)
            }
            reloadLikes()
           
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


    // ARROW UP 
    const arrowUpButton = document.querySelector('.arrowUp');
    arrowUpButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    })
    
    window.addEventListener('scroll',() => {
    if(window.scrollY > 50 ) {
        arrowUpButton.classList.add('sticky-arrow-js');
    }
    else{
        arrowUpButton.classList.remove('sticky-arrow-js');
    }
    });
