document.addEventListener("DOMContentLoaded", () => {
    MoveToNextImageSlide();
});

let slideIndex = 0;
function MoveToNextImageSlide(){
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++){
        slides[i].classList.remove("active");
    }
    
    slides[slideIndex].classList.add("active");
    slideIndex++;
    if (slideIndex >= slides.length){
        slideIndex = 0;
    }
    setTimeout(MoveToNextImageSlide, 5000);
}