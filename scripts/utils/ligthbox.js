 class Lightbox {
	static init() {
		const gallerySection = document.querySelector(".media_box");
		const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
		const gallery = links.map((link) => link.getAttribute("src"));

		links.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				new Lightbox(e.currentTarget.getAttribute("src"), gallery);
			});
			link.addEventListener("keyup", (e) => {
				if (e.keyCode === 13) {
					e.preventDefault();
					new Lightbox(e.currentTarget.getAttribute("src"), gallery);
				} else {
					return;
				}
			});
		});
	}

	constructor(url, gallery, alt) {
		this.element = this.buildDOM(url, alt);
		this.gallery = gallery;
		this.loadMedia(url, alt, gallery);
		this.formatSrcForMediaLightbox(url);
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);
		document.addEventListener("keyup", this.onKeyUp);
	}

	formatSrcForMediaLightbox(src) {
		let lightboxMediaLink = src.split("/");
		lightboxMediaLink.splice(4, 0);
		const formatedLightboxMediaLink = lightboxMediaLink.join("/");
		return formatedLightboxMediaLink;
	}
	loadMedia(url, alt) {
		this.url = url;
		this.alt = alt;
		const main = document.getElementById('main');
		if (url.endsWith(".mp4")) {
			const video = document.createElement("video");
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			legend.innerHTML += this.getFormatedTitle(url);
			container.innerHTML = "";
			container.appendChild(video);
			container.appendChild(legend);
			video.setAttribute("controls", "");
			video.src = url;
			main.classList.add('fadeIn');
			
		} else if (url.endsWith(".jpg")) {
			const image = new Image();
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			
			legend.innerHTML += this.getFormatedTitle(url);
			container.innerHTML = "";
			container.appendChild(image);
			container.appendChild(legend);
			image.alt = this.getFormatedTitle(url);
			image.src = this.formatSrcForMediaLightbox(url);
			image.classList.add("lightbox__container__img");
			main.classList.add('fadeIn');
		}
	}
	getFormatedTitle(path) {
		const splitedPath = path.split("/");
		const string = splitedPath[splitedPath.length - 1].split(".")[0];
		const formatedTitle = string.replaceAll("_", " ");
		return formatedTitle;
	}

	onKeyUp(e) {
		if (e.key === "Escape") {
			this.close(e);
		} else if (e.key === "ArrowLeft") {
			this.next(e);
		} else if (e.key === "ArrowRight") {
			this.previous(e);
		}
	}
	close(e) {
		e.preventDefault();
		this.element.classList.add("fadeOut");
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element);
		}, 500);
		document.removeEventListener("keyup", this.onKeyUp);
		main.classList.remove('fadeIn');		
	}
	next(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === this.gallery.length - 1) {
			i = -1;
		}
		this.loadMedia(this.gallery[i + 1]);
	}

	previous(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === 0) {
			i = this.gallery.length;
		}
		this.loadMedia(this.gallery[i - 1]);
	}
	buildDOM() {
		const dom = document.createElement("div");
		dom.classList.add("lightbox");
		dom.innerHTML = `
            <button class="lightbox__close" aria-label="Fermer la visualition du média">
                <svg height="60" width="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            </button>
            <button class="lightbox__next" aria-label="Image suivante">
                <svg height="60" width="40" viewBox="0 0 9 14" fill="none" xmlns="https://www.w3.org/2000/svg">
                <path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="#901C1C" />
                </svg>
            </button>
            <button class="lightbox__prev" aria-label="Image précédente">
                <svg height="60" width="40" viewBox="0 0 9 14" fill="none" xmlns="https://www.w3.org/2000/svg">
                <path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="#901C1C" />
                </svg>
            </button>
            <div class="lightbox__container" role="modal" aria-label="modal">
            <p class="lightbox__container__img-title" aria-label="titre de l'image"></p>
            </div>`;
		dom.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this));
		dom.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this));
		dom.querySelector(".lightbox__prev").addEventListener("click", this.previous.bind(this));
		return dom;
	}
}
