//****************************************************************** */
//**************************PANIER********************************** */
//****************************************************************** */

//******Récupération des données produit du local storage */
let productStorage = JSON.parse(localStorage.getItem("produit"));
//****************************************************************** */

//******Affichage du produit dans le panier */

//Fonction d'affichage du panier vide
function emptyCart() {
  const creatArticleCartItem = document.createElement("article");
  creatArticleCartItem.classList.add("cart__item");
  const newArticleCartItem = document
    .querySelector("#cart__items")
    .appendChild(creatArticleCartItem);
  newArticleCartItem.innerHTML = "<p>Le panier est vide</p>";
}

//Fonction permettant l'affichage, des produits choisis, dans le panier
const cartProductDisplay = (a) => {
  a = 0; // Variable permettant de selectionner le bon <article>
  if (!productStorage) {
    emptyCart();
  } else {
    for (let product of productStorage) {
      //Création de la balise <article> pour afficher les produits
      const creatArticleCartItem = document.createElement("article");
      creatArticleCartItem.classList.add("cart__item");
      creatArticleCartItem.setAttribute("data-id", `${product.id}`);
      creatArticleCartItem.setAttribute("data-color", `${product.color}`);
      const newArticleCartItem = document.querySelector("#cart__items");
      newArticleCartItem.appendChild(creatArticleCartItem);

      //Sélection de la balise <article> pour afficher les produits
      const section = document.querySelectorAll("#cart__items article")[a];

      //Ajout du code HTML permettant l'affichage des produits dans le panier
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
};
cartProductDisplay();
//****************************************************************** */

//******Récupération des quantités et des prix de produits */

//Variables qui contiendront le nombre total d'articles et la somme total du prix
let sumTotals = 0;
let priceTotals = 0;

//Fonction pour additionner les quantités, de produit et les prix, présent dans le panier
const totalsProductAndPrice = () => {
  if (productStorage) {
    for (let t = 0; t < productStorage.length; t++) {
      sumTotals += parseInt(productStorage[t].quantity);
      priceTotals +=
        parseInt(productStorage[t].price) *
        parseInt(productStorage[t].quantity);
    }
  }
};
totalsProductAndPrice();

//Afficher le resultat des totaux
function displayResults() {
  document.querySelector("#totalQuantity").innerHTML = sumTotals;
  document.querySelector("#totalPrice").innerHTML = priceTotals;
}
displayResults();
//****************************************************************** */

//******Fonction de suppression, avec le bouton dédié, du produit dans le panier */
function deleteItem(item) {
  //Suppréssion dans le tableau, puis mise à jour du localStorage
  productStorage.splice([item], 1);
  localStorage.setItem("produit", JSON.stringify(productStorage));
  //Confirmation de la suppréssion
  alert("Ce produit a été supprimer du panier");
  window.location.href = "cart.html";
  if (productStorage.length < 1) {
    localStorage.removeItem("produit");
    emptyCart();
  }
}
//****************************************************************** */

//******Fonction modification des totaux, prix et quantités, après suppréssion */
function modificationTotalsAfterDelete(total) {
  if (productStorage) {
    sumTotals -= parseInt(productStorage[total].quantity);
    priceTotals -=
      parseInt(productStorage[total].price) *
      parseInt(productStorage[total].quantity);
  }
}
//****************************************************************** */

//******Modification de la quantité et du prix dans le panier */

//Sélection des balises à modifier
const formQuantity = document.querySelectorAll(".itemQuantity");
const productPrice = document.querySelectorAll(
  ".cart__item__content__description p:nth-child(3)"
);
// Fonction pour le changement des quantités et prix des produit
// lors d'un changement de quantité dans le panier
const modifQuantity = () => {
  if (productStorage) {
    for (let c = 0; c < productStorage.length; c++) {
      formQuantity[c].addEventListener("change", function () {
        if (formQuantity[c].value > 0) {
          //Modification des totaux + affichage
          let quantityDiff = formQuantity[c].value - productStorage[c].quantity;
          sumTotals += quantityDiff;
          priceTotals += quantityDiff * productStorage[c].price;
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
};
modifQuantity();
//****************************************************************** */

//******Gestion de la suppression d'un produit dans la page panier */

//Sélection des boutons "Supprimer"
const deleteBtn = document.querySelectorAll(".deleteItem");

//Fonction pour la supression dans le panier et dans le localStorage,
//du produit selectionné, après avoir appuyé sur le bouton "Supprimer"
const useBtnSuppr = () => {
  if (productStorage) {
    for (let d = 0; d < productStorage.length; d++) {
      deleteBtn[d].addEventListener("click", function (e) {
        e.preventDefault;
        //Modification des totaux, prix et quantités
        modificationTotalsAfterDelete(d);
        displayResults();
        deleteItem(d);
      });
    }
  }
};
useBtnSuppr();

//****************************************************************** */
//**************************FORMULAIRE****************************** */
//****************************************************************** */

//******Fonction de validation des champs Nom, prénom, adresse et ville */
const validInput = function (input) {
  let textError = input.nextElementSibling;
  if (input.value.length > 0) {
    textError.innerHTML = "";
    return true;
  } else {
    textError.innerHTML = "Veuillez renseigner ce champ";
    return false;
  }
};

//Ecoute du champ Prénom
const firstName = document.querySelector("#firstName");
firstName.addEventListener("change", function () {
  validInput(firstName);
});

//Ecoute du champ Nom
const lastName = document.querySelector("#lastName");
lastName.addEventListener("change", function () {
  validInput(lastName);
});

//Ecoute du champ Adresse
const address = document.querySelector("#address");
address.addEventListener("change", function () {
  validInput(address);
});

//Ecoute du champ Ville
const city = document.querySelector("#city");
city.addEventListener("change", function () {
  validInput(city);
});

//******Fonction de validation du champ email */
const validEmail = function (inputEmail) {
  //Création des conditions d'acceptation de l'email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let textError = inputEmail.nextElementSibling;
  if (inputEmail.value.length > 0) {
    if (emailRegExp.test(inputEmail.value)) {
      textError.innerHTML = "";
      return true;
    } else {
      textError.innerHTML = "Format de l'email incorrect. Ex : toto7@gmail.com";
      return false;
    }
  } else {
    textError.innerHTML = "Veuillez renseigner ce champ";
    return false;
  }
};
//****************************************************************** */

//Ecoute du champ Email
const email = document.querySelector("#email");
email.addEventListener("change", function () {
  validEmail(email);
});

//******Fonction de récupération des id des produits dans le panier */
const idItems = [];
const idItem = () => {
  if (productStorage) {
    for (id of productStorage) {
      idItems.push(id.id);
    }
  }
};
idItem();
//****************************************************************** */

//Sélection du bouton "Commander !"
const order = document.querySelector("#order");

//******Fonction d'envoi du formulaire pour récuperer le numéro de commande */
order.addEventListener("click", function (event) {
  event.preventDefault();
  //Récupération des informations du formulaire
  const contactClient = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  //Regroupement des informations à envoyer à l'API
  const dataItem = {
    contact: contactClient,
    products: idItems,
  };
  //Vérification si tout le formulaire est correct avant l'envoi
  if (
    validInput(firstName) &&
    validInput(lastName) &&
    validInput(address) &&
    validInput(city) &&
    validEmail(email)
  ) {
    async function fetchPost() {
      let response = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(dataItem),
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();

      localStorage.clear();
      idOrder = `${data.orderId}`;
      window.location.href = `./confirmation.html?id-order=${idOrder}`;
    }
    fetchPost();
  } else {
    alert("Le formulaire est incomplet ou incorrecte");
  }
});
//****************************************************************** */
