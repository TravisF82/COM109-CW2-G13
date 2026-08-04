document.addEventListener("DOMContentLoaded", () => {
    MoveToNextImageSlide();
});

let slideIndex = 0;
function MoveToNextImageSlide(){
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++){
        slides[i].classList.remove("active", "stack-1", "stack-2");
    }
    
    slides[slideIndex].classList.add("active");

    slideIndex = (slideIndex + 1) % slides.length;
    const nextSlideIndex = (slideIndex + 1) % slides.length;
    const nextNextSlideIndex = (slideIndex + 2) % slides.length;

    slides[nextSlideIndex].classList.add("stack-1");
    slides[nextNextSlideIndex].classList.add("stack-2");

    setTimeout(MoveToNextImageSlide, 5000);
}