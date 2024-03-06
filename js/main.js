/* 1. Please divide codes of sections by */
/* --- section naming & purpose--- */
/* for example */
/* --- product display & scroll button --- */
/* for readable codes */

/* 2. Please name the varaibles or function with meaning naming, make it readable */

/* 3. It's fine to create another js file for new feature */

/* Have Fun LOL */

// Product mouseover trigger animation
// 滑鼠滑上圖片，抓到product name & product color name，按照順序、每秒一張的要求播放幻燈片
// 滑鼠離開後回歸原狀

// Product color change
// 點擊顏色抓到 color，改變 product/color name & actived color & 圖片
const productColor = document.querySelectorAll(".product-color");
let tmpColor;

productColor.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    // console.log(e);
    // console.log(e.target.attributes.color.value);
    // console.log(index);
    tmpColor = e.target.attributes.color.value;
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

    e.target.classList.add("product-color-active");
  });
});
