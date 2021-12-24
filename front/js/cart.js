//Appel du local storage
let productStorage = JSON.parse(localStorage.getItem("produit"));

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

//******Récupération des quantités de produits */
//Addition des quantités
let sum = 0;
if (productStorage) {
  for (let i = 0; i < productStorage.length; i++) {
    sum += parseInt(productStorage[i].quantity);
  }
}

//Afficher le resultat
const totalQuantity = (document.querySelector("#totalQuantity").innerHTML =
  sum);

//******Récupération des prix de produits */
//Addition des prix
let price = 0;
if (productStorage) {
  for (let i = 0; i < productStorage.length; i++) {
    price +=
      parseInt(productStorage[i].price) * parseInt(productStorage[i].quantity);
  }
}

//Afficher le resultat
const totalPrice = (document.querySelector("#totalPrice").innerHTML = price);
