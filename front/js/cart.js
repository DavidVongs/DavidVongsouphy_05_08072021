//******Appel du local storage */

let productStorage = JSON.parse(localStorage.getItem("produit"));
//****************************************************************** */

//******Affichage du produit dans le panier */

//Vérification de la présence d'élément dans le panier
a = 0;
if (!productStorage) {
  const creatArticleCartItem = document.createElement("article");
  creatArticleCartItem.classList.add("cart__item");
  const newArticleCartItem = document
    .querySelector("#cart__items")
    .appendChild(creatArticleCartItem);
  newArticleCartItem.innerHTML = "<p>Le panier est vide</p>";
} else {
  for (let product of productStorage) {
    //Création de l'article pour afficher les produit
    const creatArticleCartItem = document.createElement("article");
    creatArticleCartItem.classList.add("cart__item");
    creatArticleCartItem.setAttribute("data-id", `${product.id}`);
    creatArticleCartItem.setAttribute("data-color", `${product.color}`);
    const newArticleCartItem = document
      .querySelector("#cart__items")
      .appendChild(creatArticleCartItem);

    //Sélection de l'article pour afficher les produit
    const section = document.querySelectorAll("#cart__items article")[a];

    //Affichage du produit avec les informations néccessaire
    section.innerHTML = `
    <div class="cart__item__img">
    <img
        src="${product.img}"
        alt="${product.alt}"
    />
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
        <h2>${product.kName}</h2>
        <p>${product.color}</p>
        <p>${product.price * product.quantity} €</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté :</p>
        <input
            type="number"
            class="itemQuantity"
            name="itemQuantity"
            min="1"
            max="100"
            value="${product.quantity}"
        />
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
    `;
    a = a + 1;
  }
}
//****************************************************************** */

//******Récupération des quantités et des prix de produits */

let sumTotals = 0;
let priceTotals = 0;

//Addition des quantités et des prix
if (productStorage) {
  for (let t = 0; t < productStorage.length; t++) {
    sumTotals += parseInt(productStorage[t].quantity);

    priceTotals +=
      parseInt(productStorage[t].price) * parseInt(productStorage[t].quantity);
  }
}

//Afficher le resultat
function displayResults() {
  document.querySelector("#totalQuantity").innerHTML = sumTotals;
  document.querySelector("#totalPrice").innerHTML = priceTotals;
}
displayResults();

//****************************************************************** */

//******Fonction de suppression du produit dans le panier */
function deleteItem(item) {
  //Suppréssion dans le tableau, puis mise à jour du localStorage
  productStorage.splice([item], 1);
  localStorage.setItem("produit", JSON.stringify(productStorage));
  //Supréssion de l'article dans le panier
  cartItem.removeChild(cartArticle[item]);
}
//****************************************************************** */

//******Fonction modification des totaux, prix et quantités, après suppréssion */
function modificationTotalsAfterDelete(total) {
  sumTotals -= productStorage[total].quantity;
  priceTotals -=
    parseInt(productStorage[total].price) *
    parseInt(productStorage[total].quantity);
}
//****************************************************************** */

//******Modification de la quantité dans le panier */
const formQuantity = document.querySelectorAll(".itemQuantity");
const productPrice = document.querySelectorAll(
  ".cart__item__content__description p:nth-child(3)"
);
// Changement des quantités et prix des produit lors d'un changement de quantité dans le panier
if (productStorage) {
  //Détection du produit modifié
  for (let c = 0; c < productStorage.length; c++) {
    formQuantity[c].addEventListener("change", function () {
      if (formQuantity[c].value > 0) {
        //Modification des totaux + affichage
        let plus = formQuantity[c].value - productStorage[c].quantity;
        sumTotals += plus;
        priceTotals += plus * productStorage[c].price;
        displayResults();
        //Ajout des modifications dans le localStorage
        productStorage[c].quantity = formQuantity[c].value;
        localStorage.setItem("produit", JSON.stringify(productStorage));
        //Affichage du nouveau prix du produit
        productPrice[c].innerHTML =
          parseInt(productStorage[c].quantity) *
            parseInt(productStorage[c].price) +
          " €";
      } else {
        //Suppression de l'article si la quantité est égale à 0
        modificationTotalsAfterDelete(c);
        displayResults();
        deleteItem(c);
      }
    });
  }
}
//****************************************************************** */

//******Gestion de la suppréssion d'un produit dans la page panier */
const deleteBtn = document.querySelectorAll(".deleteItem");
const cartItem = document.querySelector("#cart__items");
const cartArticle = document.querySelectorAll(".cart__item");

//Supréssion dans le panier et dans le localStorage, du produit selectionné
if (productStorage) {
  for (let d = 0; d < productStorage.length; d++) {
    //Action sur le click du bouton "supprimer"
    deleteBtn[d].addEventListener("click", function () {
      //Modification des totaux, prix et quantités
      modificationTotalsAfterDelete(d);
      displayResults();
      deleteItem(d);
    });
  }
}
//****************************************************************** */
