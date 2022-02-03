	// RECUPERER LES DONNEES JSON 
	const getData = async () =>
	await fetch("./data/photographers.json", { mode: "no-cors" })
		.then((res) => res.json())
		.catch((err) => console.log("An error occurs when fetching photographers", err));


	// AFFICHER LES PHOTOGRAPHES 
	async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };
	
	// RETOURNER L'AFFICHAGE
	const init = async () => {
		const { photographers } = await getData();
		displayData(photographers);
		// console.log(photographers);
	};
	
	init();



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