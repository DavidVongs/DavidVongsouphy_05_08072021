//****************************************************************** */
//**************************PANIER********************************** */
//****************************************************************** */

//******Appel du local storage */
let productStorage = JSON.parse(localStorage.getItem("produit"));
//****************************************************************** */

//******Affichage du produit dans le panier */
//Vérification de la présence d'élément dans le panier
function panierVide() {
  const creatArticleCartItem = document.createElement("article");
  creatArticleCartItem.classList.add("cart__item");
  const newArticleCartItem = document
    .querySelector("#cart__items")
    .appendChild(creatArticleCartItem);
  newArticleCartItem.innerHTML = "<p>Le panier est vide</p>";
}

a = 0;
if (!productStorage) {
  panierVide();
} else {
  for (let product of productStorage) {
    //Création de l'article pour afficher les produit
    const creatArticleCartItem = document.createElement("article");
    creatArticleCartItem.classList.add("cart__item");
    creatArticleCartItem.setAttribute("data-id", `${product.id}`);
    creatArticleCartItem.setAttribute("data-color", `${product.color}`);
    const newArticleCartItem = document.querySelector("#cart__items");
    newArticleCartItem.appendChild(creatArticleCartItem);

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

const cartItem = document.querySelector("#cart__items");
const cartArticle = document.querySelectorAll(".cart__item");

//******Fonction de suppression du produit dans le panier */
function deleteItem(item) {
  //Suppréssion dans le tableau, puis mise à jour du localStorage
  productStorage.splice([item], 1);
  localStorage.setItem("produit", JSON.stringify(productStorage));
  //Supréssion de l'article dans le panier
  alert("Ce produit a été supprimer du panier");
  window.location.href = "cart.html";
  if (productStorage.length < 1) {
    localStorage.removeItem("produit");
    panierVide();
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

//Supréssion dans le panier et dans le localStorage, du produit selectionné
if (productStorage) {
  const deleteBtn = document.querySelectorAll(".deleteItem");
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

//Ecoute du champ Email
const email = document.querySelector("#email");
email.addEventListener("change", function () {
  validEmail(email);
});

let orderStorage = JSON.parse(localStorage.getItem("clientOrder"));

const idItems = [];
if (productStorage) {
  let idItem = function () {
    for (id of productStorage) {
      idItems.push(id.id);
    }
  };
  idItem();
}

const order = document.querySelector("#order");

// order.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const contact = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     adress: address.value,
//     city: city.value,
//     email: email.value,
//     "product-ID": idItems,
//   };
//   console.log(JSON.stringify(contact));
//   if (
//     validInput(firstName) &&
//     validInput(lastName) &&
//     validInput(address) &&
//     validInput(city) &&
//     validEmail(email)
//   ) {
//     const promise01 = fetch("http://localhost:3000/api/products/order", {
//       method: "POST",
//       body: JSON.stringify(contact),
//       headers: { "Content-Type": "application/json" },
//     });

// promise01.then(async (response) => {
//   try {
//     console.log(response);
//     const contenu = await response.json();
//     console.log(contenu);
//   } catch (e) {
//     console.log(e);
//   }
// });

// if (!orderStorage) {
//   orderStorage = [];
//   orderStorage.push(contact);
//   localStorage.setItem("clientOrder", JSON.stringify(orderStorage));
// } else {
//   orderStorage.push(contact);
//   localStorage.setItem("clientOrder", JSON.stringify(orderStorage));
// }
//   } else {
//     console.log("Le formulaire est incomplet ou incorrecte");
//   }
// });

// let urlK = "http://localhost:3000/api/products/";

const contactClient = {
  firstName: "lol",
  lastName: "lool",
  adress: "lolo",
  city: "lolo",
  email: "lolo",
};

productsId = idItems;

const dataItem = {
  contact: contactClient,
  products: productStorage.map((produit) => produit.id),
};

const promise01 = fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  body: JSON.stringify(dataItem),
  headers: { Accept: "application/json", "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(JSON.stringify(data));
  });

// promise01.then(async (response) => {
//   try {
//     const contenu = await response.json();
//     console.log(contenu);
//   } catch (e) {
//     console.log(e);
//   }
// });
