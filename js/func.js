let animation_time = "fast";

const load = () => {
    const pics = $(".img-container img").map(function() {
        return {
            picture: $(this).attr("src"),
            caption: $(this).siblings("h3").text() + "\n" + $(this).siblings("p").text()
        };
    }).get();

    for (let idx in pics) {
        const div_container = $("<div></div>");
        div_container.addClass("mySlides");
        const number_lbl = $("<div></div>");
        number_lbl.addClass("numbertext");
        number_lbl.text(`${parseInt(idx) + 1} / ${pics.length}`);
        div_container.append(number_lbl);
        const img = $("<img/>");
        img.attr("src", pics[idx].picture);
        img.css("width", "100%");
        div_container.append(img);
        const caption = $("<div></div>");
        caption.addClass("text");
        caption.text(pics[idx].caption);
        div_container.append(caption);
        $(".img-gallery-container").append(div_container);
        const dot = $("<span></span>");
        dot.addClass("dot");
        dot.click(showSlides);
        $("#dot-container").append(dot);
    }

    $(".mySlides").eq(0).addClass("pic_active");
    $(".mySlides").eq(0).fadeIn(animation_time);
    dotActivator();
}

const dotActivator = () => {
    $(".dot").removeClass("active");
    let idx = $(".pic_active").not("a").index() - 2;
    $(".dot").eq(idx).addClass("active");
}

function showSlides(e) {
    if ($(e.target).hasClass("next")) {
        let current = $(".pic_active");
        let idx = -1;
        current.fadeOut(animation_time, () => {
            if (current.next().length == 0) {
                $(".mySlides").first().addClass("pic_active");
                $(".mySlides").first().fadeIn(animation_time);
                idx = 0;
            } else {
                current.next().not("a").addClass("pic_active");
                current.next().not("a").fadeIn(animation_time);
            }
            current.removeClass("pic_active");
            dotActivator();
        })
    } else if ($(e.target).hasClass("prev")) {
        let current = $(".pic_active");
        current.fadeOut(animation_time, () => {
            if (current.index() == $(".mySlides").first().index()) {
                $(".mySlides").last().addClass("pic_active");
                $(".mySlides").last().fadeIn(animation_time);
            } else {
                current.prev().not("a").addClass("pic_active");
                current.prev().not("a").fadeIn(animation_time);
                dotActivator();
            }
            current.removeClass("pic_active");
        })
    } else if ($(e.target).hasClass("dot")) {
        let idx = $(e.target).index();
        $(".pic_active").fadeOut(animation_time, () => {
            $(".pic_active").removeClass("pic_active");
            $(".mySlides").eq(idx).fadeIn(animation_time);
            $(".mySlides").eq(idx).addClass("pic_active");
            dotActivator();
        });
    }
}

$(document).ready(function() {
    load();
    $("a.prev").click(showSlides);
    $("a.next").click(showSlides);
});
