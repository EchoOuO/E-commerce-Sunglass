/* 1. Please divide codes of sections by */
/* --- section naming & purpose--- */
/* for example */
/* --- product display & scroll button --- */
/* for readable codes */

/* 2. Please name the varaibles or function with meaning naming, make it readable */

/* 3. It's fine to create another js file for new feature */

/* Have Fun LOL */

// Get product data from JSON
const productList = new Map();
const comparisonList = new Map();

const load = () => {
  const xHttp = new XMLHttpRequest();
  xHttp.onload = function () {
    let tmpData = JSON.parse(xHttp.responseText);
    for (let data of tmpData) {
      productList.set(data.pid, data);
    }

    let index;

    // Dynamically update the products
    for (let product of productList.values()) {
      let pid = product.pid;
      index = pid - 1001;
      const productName = $("<p></p>");
      const productPrice = $("<p></p>");
      const productColor = $("<p></p>");

      productName.text(product.Name);
      productName.addClass("product-name");
      $(".product-detail-container").eq(index).append(productName);

      productPrice.text(product.Price);
      productPrice.addClass("product-price");
      $(".product-detail-container").eq(index).append(productPrice);

      productColor.text(product.Color[0]);
      productColor.addClass("product-style");
      $(".product-container").after().eq(index).append(productColor);

      index++;
    }
  };
  xHttp.open("get", "./js/data.json");
  xHttp.send();
};
load();

// Product color change
const productColor = document.querySelectorAll(".product-color");
let tmpColor;
let tmpName;

productColor.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    tmpColor = e.target.attributes.color.value;
    tmpName = e.target.parentElement.previousElementSibling.alt;

    $(e.target.parentElement.children).removeClass("product-color-active");
    $(e.target).addClass("product-color-active");

    $(e.target.parentElement.nextElementSibling.nextElementSibling).text(
      tmpColor
    );
    $(e.target.parentElement.previousElementSibling).attr(
      "src",
      `./img/product-display/${tmpName}-${tmpColor}-1.jpg`
    );

    e.target.classList.add("product-color-active");
  });
});

// Product mouseover trigger animation
let count = 0;
let intervalTimer;
const productImg = document.querySelectorAll(".product-img");

for (let idx of productImg) {
  idx.addEventListener("mouseover", (e) => {
    tmpName = e.target.attributes.alt.value;
    tmpColor = e.target.nextElementSibling.children;
    count = 0;
    clearInterval(intervalTimer);

    function imgHandler() {
      for (let color of tmpColor) {
        if (color.classList.contains("product-color-active")) {
          let activeColor = color.attributes.color.value;

          count += 1;
          if (Math.floor(count) <= 7) {
            e.target.src = `./img/product-display/${tmpName}-${activeColor}-${Math.floor(
              count
            )}.jpg`;
          } else if (Math.floor(count) > 7) {
            e.target.src = `./img/product-display/${tmpName}-${activeColor}-1.jpg`;
            clearInterval(intervalTimer);
          }

          idx.addEventListener("mouseleave", (e) => {
            e.target.src = `./img/product-display/${tmpName}-${activeColor}-1.jpg`;
          });
        }
      }
    }

    intervalTimer = setInterval(imgHandler, 800);

    // avoid bug: mouseover less than 1 sec (didn't trigger function imgHandler)
    idx.addEventListener("mouseleave", (e) => {
      clearInterval(intervalTimer);
    });
  });
}

// open/close table (fade in/out)
function openTable(e) {
  if ($(".checked").length > 1) {
    $(".comparison-table").fadeIn();
    $(".comparison-table").css("display", "flex");
  } else {
    alert("Please choose at lease 2 products");
    $(".product-comparison-text").css({
      transition: "0.5s ease-in-out",
      color: "red",
    });
    setTimeout(() => {
      $(".product-comparison-text").css({
        color: "",
      });
    }, 1500);
  }
}

$(".product-compare-button").click(() => {
  openTable();
  tableHandler();
});

function closeTable(e) {
  $(".comparison-table").fadeOut(100);
}

$(".table-filter").click(() => {
  closeTable();
});

$(".comparison-close-button").click(() => {
  closeTable();
});

// press esc to close modal box+
$(document).on("keydown", (e) => {
  if (e.keyCode == 27) {
    closeTable();
  }
});

// checkbox & comapre button
$(".product-comparison-checkbox").click((e) => {
  if (e.target.checked) {
    $(e.target).addClass("checked");
  } else {
    $(e.target).removeClass("checked");
  }

  if (
    $(".product-comparison-checkbox").hasClass("checked") &&
    $(".checked").length > 1
  ) {
    $(".product-compare-button").addClass("product-compare-button-active");
  } else {
    $(".product-compare-button").removeClass("product-compare-button-active");
  }

  if ($(".checked").length > 3) {
    alert("Only 3 products allowed in maximum");
    e.target.checked = false;
  }
});

// the index can't be changed , otherwise will get wrong data
document
  .querySelectorAll(".product-comparison-text")
  .forEach((checkbox, index) => {
    $(".product-comparison-checkbox")
      .eq(index)
      .click((e) => {
        let pid = index + 1001;
        let tmpData = productList.get(pid);

        if (e.target.checked) {
          comparisonList.set(pid, tmpData);
        } else {
          comparisonList.delete(pid);
        }
      });
  });

function tableHandler() {
  let index = 0;

  tableInit();

  for (let product of comparisonList.values()) {
    $(".table-product-img")
      .eq(index)
      .attr(
        "src",
        `./img/product-display/${product.Name}-${product.Color[0]}-1.jpg`
      );

    $(".table-product-name").eq(index).text(product.Name);
    $(".table-UV-text").eq(index).text(product.UV);
    $(".table-l-material-text").eq(index).text(product.Lmaterial);
    $(".table-weight-text").eq(index).text(product.Weight);
    $(".table-review-text").eq(index).text(product.Review);
    $(".table-price-text").eq(index).text(product.Price);
    $(".table-cart-anchor").eq(index).attr("href", product.Url);

    for (let i = 0; i < product.Color.length; i++) {
      // console.log(
      //   $(".product-container").find(".product-color-active").attr("color")
      // );

      const color = $("<img></img>");
      let activeColor;
      activeColor = $(".product-container")
        .find(".product-color-active")
        .eq(index)
        .attr("color");

      console.log(product.Color[i]);
      console.log(activeColor);
      console.log("---------");

      // bugs!!!!!!!!!!!
      // 只有當 productList 內的順序 跟 外面的順序是一樣的時候才能動
      // 例如 外面是 1 2 3，而productList 是 2 1 3 則 全部失敗、1 2 3 全部成功、2 1 3 則 3 成功
      if (
        product.Color[i] == activeColor &&
        $(".product-comparison-checkbox").hasClass("checked")
      ) {
        color.addClass("table-product-color-active");
      }

      color.attr("src", `./icon/color-${product.Name}-${product.Color[i]}.png`);
      color.attr("alt", `${product.Color[i]}`);
      color.addClass("table-product-color");

      $(".table-product-color-container").eq(index).append(color);
    }

    for (let j = 0; j < product.Fmaterial.length; j++) {
      const frameMateiral = $("<img></img>");
      frameMateiral.attr("src", `./img/${product.Fmaterial[j]}.png`);
      frameMateiral.addClass(".table-f-material-img");
      $(".table-f-material-img-container").eq(index).append(frameMateiral);
    }
    // color.first().addClass("table-product-color-active");

    index++;
  }

  // Table product color change
  $(".table-product-color").click((e) => {
    $(e.target.parentElement.children).removeClass(
      "table-product-color-active"
    );
    $(e.target).addClass("table-product-color-active");

    tmpName = e.target.parentElement.nextElementSibling.innerText;
    tmpColor = $(e.target.parentElement)
      .find(".table-product-color-active")
      .attr("alt");

    $(e.target.parentElement.previousElementSibling).attr(
      "src",
      `./img/product-display/${tmpName}-${tmpColor}-1.jpg`
    );
  });

  // disable 3rd column in table
  if (comparisonList.size < 3) {
    $(".table-cart-button").eq(2).attr("disabled", "disabled");
    $(".table-cart-button").eq(2).css("cursor", "not-allowed");
    $(".table-cart-button").eq(2).css("display", "none");
  } else {
    $(".table-cart-button").eq(2).removeAttr("disabled");
    $(".table-cart-button").eq(2).css("cursor", "pointer");
    $(".table-cart-button").eq(2).css("display", "");
  }
}

function tableInit() {
  $(".table-product-img").attr("src", ``);
  $(".table-f-material-img-container").text("");
  $(".table-product-name").text("");
  $(".table-product-color-container").text("");
  $(".table-UV-text").text("");
  $(".table-l-material-text").text("");
  $(".table-weight-text").text("");
  $(".table-review-text").text("");
  $(".table-price-text").text("");
}

// Product Quick View

// product slideshow
const mySlides = $(".mySlides");
const next = $(".next");
const previous = $(".previous");

let index = 0;

function init() {
  mySlides.eq(0).css("display", "block");
  imgHandler(0);

  // doesn't work!!!!!!!!!!1
  for (let i = 0; i < mySlides.length; i++) {
    const div = $("<div></div>");
    let dot = div.addClass("dot");
    $(".slidesDots").append(dot);
  }

  $(".dot").eq(0).addClass("active");
}
init();

next.click(() => {
  if (index < mySlides.length - 1) {
    index++;
  } else if (index == mySlides.length - 1) {
    index = 0;
  }
  imgHandler(index);
  dotHandler(index);
});

previous.click(() => {
  if (index > -mySlides.length + 1) {
    index--;
  } else if (index == -mySlides.length + 1) {
    index = 0;
  }
  imgHandler(index);
  dotHandler(index);
});

function imgHandler(idx) {
  mySlides.css("display", "none");
  mySlides.eq(idx).fadeIn();
}

function dotHandler(idx) {
  // console.log($(".dot").eq(idx));
  $(".dot").removeClass("active");
  $(".dot").eq(idx).addClass("active");
}

// Auto slides
// function autoSlide() {
//   if (index < mySlides.length - 1) {
//     index++;
//     console.log(index);
//   } else if (index == mySlides.length - 1) {
//     index = 0;
//     console.log(index);
//   }
//   imgHandler(index);
//   dotHandler(index);
// }

// let autoImgShow = setInterval(autoSlide, 2000);

// $(".slideImg").on("mouseover", () => {
//   clearInterval(autoImgShow);
// });

// $(".slideImg").on("mouseleave", () => {
//   clearInterval(autoImgShow);
//   setInterval(autoSlide, 2000);
// });

// ----------

// Quick view modal box

// init
function quickViewInit() { }
quickViewInit();

// open quick view

function openQuickView() {
  // console.log("openQuickView function called");
  $(".product-quick-view").slideDown(250);
  $(".product-quick-view").css("display", "flex");
}

$(".product-quick-view-button").click(() => {
  openQuickView();
});

// close quick view
function closeQuickView(e) {
  $(".product-quick-view").slideUp(250);
}

// $(".product-quick-view").click(() => {
//   closeQuickView();
// });

$(".product-quick-view-close-button").click(() => {
  closeQuickView();
});

// press esc to close modal box+

$(document).on("keydown", (e) => {
  if (e.keyCode == 27) {
    closeQuickView();
  }
});

// Description / Feature switch

const title = $(".quick-view-title");
const description = $(".quick-view-description");
const features = $(".quick-view-features");

title.click((e) => {
  detailsActive(e);
});

function detailsActive(e) {
  // console.log(e.target);
  title.removeClass("quick-view-title-active");
  $(e.target).addClass("quick-view-title-active");

  if (e.target.innerText == "Description") {
    description.slideDown();
    features.slideUp();
  } else {
    description.slideUp();
    features.slideDown();
  }
}

//change picture

// Change products item
const productsJsonPath = 'js/data.json';

$(document).ready(function () {
  // Used to store loaded product data
  let productsData = [];

  // Load JSON data
  $.getJSON(productsJsonPath, function (data) {
    productsData = data; // Save data for later use
  });

  // Bind click event to Quick View buttons
  $('.product-quick-view-button').click(function () {
    // Get data-id
    const productId = $(this).data('pid');


    // Find the corresponding product in the product data
    const product = productsData.find(p => p.pid === productId);

    if (product) {
      // Update modal content
      $('.quick-view-product-name').text(product.Name);
      $('.quick-view-price').text(product.Price);
      $('.quick-view-description').text(product.Description);
      // Assume "Img" in your JSON is the main image
    
      // $('.slideImg').attr('src','product.Img');
      $('.quick-view-features').html(`<ul>${product.Features.map(f => `<li>${f}</li>`).join('')}</ul>`);
      $('.quick-view-review').text(product.Review);
      $('.reviewN').text(product.ReviewN);
      $('.quick-view-color-container').text(product.Color.join(', '));
      $('.quick-view-material-container').text(product.Fmaterial.join(', '));
      $('.mySlides img').attr('src', './img/product-display/WEBP.jpg');
      $('.quick-view-more-details-button').attr('href', product.Url);
      
      // Display the modal
      $('.product-quick-view').slideDown(250).css('display', 'flex');
    }

  });

});



// // Update colors, materials, description, features, etc.
// $('.quick-view-color-container').text(product.Color.join(', '));
// $('.quick-view-material-container').text(product.Fmaterial.join(', '));
// $('.quick-view-description').text(product.Description.join(' '));
// $('.quick-view-features').html(product.Features.map(f => `< li > ${ f }</li > `).join(''));
// $('.quick-view-price-review-container p').text(product.Price);
// $('.quick-view-review-container img').attr('src', './icon/review-star.png');
// $('.quick-view-review-container p').eq(1).text(product.Review);
// $('.quick-view-review-container p').eq(2).text(`(${ product.ReviewN } reviews)`);
// $('.quick-view-more-details-button').attr('href', product.Url);
// // Update the URL for the "Add to Cart" button if needed
// $('.quick-view-cart-button').attr('href', yourCartUrl);


function openQuickView() {
  $('.product-quick-view').fadeIn(); // Use jQuery's fadeIn effect to show the Quick View modal
}

// Close Quick View Modal
$('.product-quick-view-close-button').click(function () {
  $('.product-quick-view').fadeOut(); // Use jQuery's fadeOut effect to hide the Quick View modal
});

// Optional: Close Quick View Modal on pressing ESC key
$(document).on('keydown', function (e) {
  if (e.key === "Escape") { // ESC key
    $('.product-quick-view').fadeOut();
  }
});
