function photographerFactory(data) {
    const { name, portrait,country,city,tagline,price,tags,id } = data;

    const picture = `assets/photographers/${portrait}`;
    const alt = "portrait de photographe";
    const photographerPageScr = `./photographer.html?id=${id}`;
    const locationCity = `${city}`;
    const locationCountry = `${country}`;
    const slogan = `${tagline}`;
    const rate = `${price}`;
    const tag = `${tags}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        const txtPresentation = document.createElement( 'div' );
        txtPresentation.classList.add('txtPresentation');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", alt);
        link.setAttribute("href", photographerPageScr);

        const h2 = document.createElement( 'h2' );
        const h4 = document.createElement( 'h4' );
        const p = document.createElement( 'p' );
        const rateP = document.createElement( 'span' );
        const tagLi = document.createElement( 'li' );
        tagLi.classList.add('header__filters__navigation__tag');
        tagLi.classList.add('focus__element');
        const tagSpan = document.createElement( 'span' );

        h2.textContent = name;
        h4.textContent = locationCity +',' + locationCountry;
        p.textContent = slogan;
        tagSpan.textContent = tag;
        rateP.textContent = rate+'€/jour' ;
        article.appendChild(link);
        article.appendChild(tagLi);
        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(txtPresentation);
        txtPresentation.appendChild(h4);
        txtPresentation.appendChild(p);
        txtPresentation.appendChild(rateP);
        tagLi.appendChild(tagSpan);

        return (article);

    }
    return { name, picture,locationCity,locationCountry,slogan,rate,tag, getUserCardDOM }
}


