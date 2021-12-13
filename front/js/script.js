let urlKanap = "http://localhost:3000/api/products/";

const addLink = () => {
  const aKanap = document.createElement("a");
  const newA = document.querySelector("#items").appendChild(aKanap);
  // console.log(newA);
};

async function addDescription(i) {
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
}

async function kanapAsync() {
  let response = await fetch(urlKanap);
  let data = await response.json();
  // console.log(data);

  let u = 0;

  for (let kanap2 of data) {
    addLink();
    addDescription(u);
    u = u + 1;
  }

  let o = 0;

  for (let kanap of data) {
    const kanapProductLink = document.querySelectorAll("#items a")[o];
    console.log(kanapProductLink);
    kanapProductLink.setAttribute("href", `./product.html?id=${kanap._id}`);

    const kanapImg = document.querySelectorAll("#items article img")[o];
    // console.log(kanapImg);
    kanapImg.setAttribute("src", `${kanap.imageUrl}`);
    kanapImg.setAttribute("alt", `${kanap.altTxt}`);

    const kanapName = document.querySelectorAll(
      "#items article h3.productName"
    )[o];
    // console.log(kanapName);
    kanapName.innerHTML = `${kanap.name}`;

    const kanapDescription = document.querySelectorAll(
      "#items article p.productDescription"
    )[o];
    // console.log(kanapDescription);
    kanapDescription.innerHTML = `${kanap.description}`;

    o = o + 1;
  }
}

kanapAsync();
