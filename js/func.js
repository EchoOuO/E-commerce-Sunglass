const prev = document.querySelectorAll(".img-gallery-button");

prev[0].addEventListener("click", function() {
    $(".img-gallery-container").animate({
        scrollLeft: "-=400"
    }, 500); // Altere o valor '500' para controlar a velocidade da animação
});

prev[1].addEventListener("click", function() {
    $(".img-gallery-container").animate({
        scrollLeft: "+=400"
    }, 500); // Altere o valor '500' para controlar a velocidade da animação
});

function showSlides(e) {
    // Restante do seu código aqui...
}
