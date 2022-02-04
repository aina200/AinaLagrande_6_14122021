
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
    // METTRE LES MEDIAS D'UN PHOTOGRAPHE DS UNE VARIABLE 
    const selectedMediaData = media.filter(
		(media) => media.photographerId == id
	);


    // FUNCTION POUR HEADER HTML 
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
                        <video controls class="media_content" tabindex="5">
                            <source src="assets/media/${element.video}"type="video/mp4"/>
                        </video>
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
                    } else {
                        throw "Unknown Media Type";
                    }
                })
                
            }
            mediaHtmlCreate();

            // TOTAL LIKES 
            // function totalLikes() {
                let totalLike = 0;
                selectedMediaData.forEach((media) => (totalLike += media.likes));
            
           
                const likesCounter = document.querySelector('.total_likes')
                const likeTotalSpan = document.createElement( 'span' );
                const priceForDay =  document.createElement( 'p' );
                likeTotalSpan.innerHTML=`
                <p>${totalLike}</p><i class="heart fas fa-heart like fa-1x"></i>
                `
                priceForDay.innerHTML = `<p>${selectedPhotographerData.price}€/jour</p>`
                likesCounter.appendChild(likeTotalSpan);
                likesCounter.appendChild(priceForDay);
            // }
            // totalLikes() 
            const buttonLike = document.querySelectorAll('.likes_box');
            
            
            buttonLike.forEach(function (i) {
                
                i.addEventListener("click", function () {
                    const liked = i.dataset.liked === "true";
                    const heart = i.querySelector('.heart')
                    i.dataset.liked = !liked;
                    
                    if (liked) {
                        heart.style.color = "#DB8876";
                        buttonLike.ariaLabel = "J'aime pas"
                        console.log(totalLike--)

                    } else if (!liked) {
                        heart.style.color = "#901C1C";
                        buttonLike.ariaLabel = "J'aime"
                        console.log(totalLike++)
                    }
                })                
            })
                // FILTER TRIGGER
            document.addEventListener("change", function (event) {
                const option = filterByOption(selectedMediaData, event.target.value);
                console.log(option)
                // displayData(option);
                // mediaHtmlCreate()
                
            });



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

arrowUp()



