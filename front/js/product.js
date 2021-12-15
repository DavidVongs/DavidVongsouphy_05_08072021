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
    console.log("Error : " + err);
  }
}

kanapProductInformation();
