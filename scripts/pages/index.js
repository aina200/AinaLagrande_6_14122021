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
	};
	
	init();

	console.log()
