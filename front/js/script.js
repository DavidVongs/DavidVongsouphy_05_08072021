let urlKanap = "http://localhost:3000/api/products/";

//*******Création de balises <a> */

const addLink = () => {
  const aKanap = document.createElement("a");
  const newA = document.querySelector("#items").appendChild(aKanap);
};

//******Fonction générant les différentes balise de description du produit */

const addDescription = (i) => {
  const articleKanap = document.createElement("article");
  const newArticle = document
    .querySelectorAll("#items a")
    [i].appendChild(articleKanap);

  const addImg = document.createElement("img");
  const newImg = document
    .querySelectorAll("#items article")
    [i].appendChild(addImg);

  const addH3 = document.createElement("h3");
  const newH3 = document
    .querySelectorAll("#items article")
    [i].appendChild(addH3);
  addH3.classList.add("productName");

  const addP = document.createElement("p");
  const newP = document.querySelectorAll("#items article")[i].appendChild(addP);
  addP.classList.add("productDescription");
};

//******Fonction de récupération des données de l'API avec fetch */

async function kanapAffichage() {
  try {
    let response = await fetch(urlKanap);
    let data = await response.json();

    let u = 0; //Variable permettant de choisir le <a> à implémenter
    for (let kanap2 of data) {
      addLink();
      addDescription(u);
      u = u + 1;
    }

    let o = 0; //Variable permettant de choisir le bon parent à implémenter//
    for (let kanap of data) {
      //Création d'un lien unique pour chaque produit via son Id
      const kanapProductLink = document.querySelectorAll("#items a")[o];
      kanapProductLink.setAttribute("href", `./product.html?id=${kanap._id}`);

      const kanapImg = document.querySelectorAll("#items article img")[o];
      kanapImg.setAttribute("src", `${kanap.imageUrl}`);
      kanapImg.setAttribute("alt", `${kanap.altTxt}`);

      const kanapName = document.querySelectorAll(
        "#items article h3.productName"
      )[o];
      kanapName.innerHTML = `${kanap.name}`;

      const kanapDescription = document.querySelectorAll(
        "#items article p.productDescription"
      )[o];
      kanapDescription.innerHTML = `${kanap.description}`;

      o = o + 1;
    }
  } catch (err) {
    console.log("Error : " + err);
  }
}

kanapAffichage();
