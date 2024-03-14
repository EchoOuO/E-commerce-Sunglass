const prev = document.querySelectorAll(".img-gallery-button");

prev[0].addEventListener("click", function() {
    $(".img-gallery-container").animate({
        scrollLeft: "-=400"
    }, 500); 
});

prev[1].addEventListener("click", function() {
    $(".img-gallery-container").animate({
        scrollLeft: "+=400"
    }, 500);
});
