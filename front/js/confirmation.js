let params = new URLSearchParams(document.location.search);
let idOrder = params.get("id-order");

//Sélection de l'order Id pour l'afficher sur la page
const orderId = document.querySelector("#orderId");
orderId.innerHTML = idOrder;
