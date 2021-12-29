let params = new URLSearchParams(document.location.search);
let id = params.get("id");

//******Récupération du lien des produits */
let urlKanap = `http://localhost:3000/api/products/${id}`;

//******Fonction de récupération des données de l'API avec fetch */
// Ajout des données concernant le produit selectionné
async function kanapProductInformation() {
  try {
    let response = await fetch(urlKanap);
    let data = await response.json();

    const creatImg = document.createElement("img");
    const newImg = document
      .querySelector("section.item article div.item__img")
      .appendChild(creatImg);
    creatImg.setAttribute("src", `${data.imageUrl}`);
    creatImg.setAttribute("alt", `${data.altTxt}`);

    const newTitle = (document.querySelector(
      "#title"
    ).innerHTML = `${data.name}`);

    const newPrice = (document.querySelector(
      "#price"
    ).innerHTML = `${data.price}`);

    const newDescription = (document.querySelector(
      "#description"
    ).innerHTML = `${data.description}`);

    for (let colors = 0; colors < `${data.colors.length}`; colors += 1) {
      const colorsOption = document.createElement("option");
      const colorsKanap = document
        .querySelector("#colors")
        .appendChild(colorsOption);

      colorsKanap.setAttribute("value", `${data.colors[colors]}`);
      colorsKanap.innerHTML = `${data.colors[colors]}`;
    }
  } catch (err) {
    console.error(err);
    alert(`${err}`);
  }
}
kanapProductInformation();

//******Transfert des produits selectionnés par le client dans le panier */
//Action effectuée au click sur le bouton "Ajouter au panier"
const btnAjoutPanier = document.querySelector("#addToCart");

btnAjoutPanier.addEventListener("click", (e) => {
  e.preventDefault();

  try {
    //Récupération des données de l'API
    async function ajoutKanap() {
      let response = await fetch(urlKanap);
      let data = await response.json();

      //Récupération des données du produit
      const selectColor = document.getElementById("colors");
      const colorChoice = selectColor.options[selectColor.selectedIndex].text;
      const formQuantity = document.getElementById("quantity").value;
      const infoKanap = {
        id: `${data._id}`,
        img: `${data.imageUrl}`,
        kName: `${data.name}`,
        price: `${data.price}`,
        color: `${colorChoice}`,
        quantity: `${formQuantity}`,
        alt: `${data.altTxt}`,
      };

      //vérification de la présence d'un produit dans le storage
      let productStorage = JSON.parse(localStorage.getItem("produit"));

      //Ajout du produit dans le localStorage
      if (!productStorage) {
        productStorage = [];
        productStorage.push(infoKanap);
        localStorage.setItem("produit", JSON.stringify(productStorage));
      } else {
        //Vérification de la présence ou non de doublon dans le localStorage
        const indice = productStorage.findIndex(
          (kanap) =>
            `${infoKanap.id}` == `${kanap.id}` &&
            `${infoKanap.color}` == `${kanap.color}`
        );
        //si oui, incrémenter la quantité du produit existant
        if (indice > -1) {
          productStorage[indice].quantity =
            parseInt(`${productStorage[indice].quantity}`) +
            parseInt(`${infoKanap.quantity}`);
          localStorage.setItem("produit", JSON.stringify(productStorage));
          //si non, incrémenter un nouvel objet dans le tableau
        } else {
          productStorage.push(infoKanap);
          localStorage.setItem("produit", JSON.stringify(productStorage));
        }
      }
    }

    ajoutKanap();
  } catch (err) {
    console.error(err);
  }
});
