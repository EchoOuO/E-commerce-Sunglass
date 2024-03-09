/* 1. Please divide codes of sections by */
/* --- section naming & purpose--- */
/* for example */
/* --- product display & scroll button --- */
/* for readable codes */

/* 2. Please name the varaibles or function with meaning naming, make it readable */

/* 3. It's fine to create another js file for new feature */

/* Have Fun LOL */

// Product color change
const productColor = document.querySelectorAll(".product-color");
let tmpColor;
let tmpName;

productColor.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    // console.log(e);
    // console.log(e.target.attributes.color.value);
    // console.log(index);
    tmpColor = e.target.attributes.color.value;
    tmpName = e.target.parentElement.previousElementSibling;
    // console.log(tmpColor);

    // index = number, not string
    switch (index) {
      case 0:
      case 1:
      case 2:
        document.querySelectorAll(".product-style")[0].innerHTML = tmpColor;
        productColor[0].classList.remove("product-color-active");
        productColor[1].classList.remove("product-color-active");
        productColor[2].classList.remove("product-color-active");
        document.querySelectorAll(
          ".product-img"
        )[0].src = `./img/product-display/Hawthorne Acetate-${tmpColor}-1.jpg`;
        break;
      case 3:
      case 4:
      case 5:
        document.querySelectorAll(".product-style")[1].innerHTML = tmpColor;
        productColor[3].classList.remove("product-color-active");
        productColor[4].classList.remove("product-color-active");
        productColor[5].classList.remove("product-color-active");
        document.querySelectorAll(
          ".product-img"
        )[1].src = `./img/product-display/Canby ACTV-${tmpColor}-1.jpg`;
        break;
      case 6:
      case 7:
      case 8:
        document.querySelectorAll(".product-style")[2].innerHTML = tmpColor;
        productColor[6].classList.remove("product-color-active");
        productColor[7].classList.remove("product-color-active");
        productColor[8].classList.remove("product-color-active");
        document.querySelectorAll(
          ".product-img"
        )[2].src = `./img/product-display/Kennedy Acetate-${tmpColor}-1.jpg`;
        break;
    }

    console.log(index);

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
    console.log(e.target.checked);
    e.target.checked = false;
  }
});

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
    // console.log(productList);
  };
  xHttp.open("get", "./js/data.json");
  xHttp.send();
};
load();

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
          // console.log(comparisonList);
        } else {
          comparisonList.delete(pid);
          // console.log(comparisonList);
        }
      });
  });

function tableHandler() {
  let index = 0;

  $(".table-product-name").text("");

  for (let product of comparisonList.values()) {
    if (index < $(".table-product-name").length) {
      // let activeColor = $("");

      // $(".product-img").eq(
      //   index
      // ).src = `./img/product-display/${product.Name}-${activeColor}--1.jpg`;
      $(".table-product-name").eq(index).text(product.Name);
      $(".table-UV-text").eq(index).text(product.UV);
      $(".table-l-material-text").eq(index).text(product.Lmaterial);
      $(".table-weitght-text").eq(index).text(product.Weight);
      $(".table-review-text").eq(index).text(product.Review);
      $(".table-price-text").eq(index).text(product.Price);

      index++;
    }
  }
}
