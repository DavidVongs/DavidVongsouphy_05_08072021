let params = new URLSearchParams(document.location.search);
let idOrder = params.get("id-order");

const orderId = document.querySelector("#orderId");
orderId.innerHTML = idOrder;
