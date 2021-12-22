const creatArticle = document.createElement("article");
creatArticle.classList.add("cart__item");
creatArticle.setAttribute("data-id", "#");
creatArticle.setAttribute("data-color", "#");
const newArticle = document
  .querySelector("#cart__items")
  .appendChild(creatArticle);

const creatBlockImg = document.createElement("div");
creatBlockImg.classList.add("cart__item__img");
const newBlockImg = document
  .querySelector("#cart__items article")
  .appendChild(creatBlockImg);

const creatImgCart = document.createElement("img");
creatImgCart.setAttribute("src", "#");
creatImgCart.setAttribute("alt", "#");
const newImgCart = document
  .querySelector("#cart__items article")
  .appendChild(creatImgCart);
