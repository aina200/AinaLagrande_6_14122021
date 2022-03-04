export const getData = () => fetch("./data/photographers.json", {mode: 'no-cors'})
  .then(res => res.json())
  .catch(err => console.log("An error occurs when fetching photographers", err))

    // ARROW UP 
    export function arrowUp (){
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

}
    
