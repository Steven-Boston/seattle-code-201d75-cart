/* global Cart */
'use strict';
const tbody = document.getElementsByTagName("tbody");


// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('userCart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  tbody[0].innerHTML = '';

}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  for (let i = 0; i < cart.items.length; i++) {
    const trElem = document.createElement("tr");
    tbody[0].appendChild(trElem);

    const tdElem1 = document.createElement("td");
    trElem.appendChild(tdElem1);

    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    tdElem1.appendChild(removeButton);
    removeButton.setAttribute("id", i);
    // removeButton.addEventListener("click", removeItemFromCart);

    const tdElem2 = document.createElement("td");
    tdElem2.textContent = cart.items[i].quantity;
    trElem.appendChild(tdElem2);

    const tdElem3 = document.createElement("td");
    tdElem3.textContent = Product.allProducts[cart.items[i].product].name;
    trElem.appendChild(tdElem3);
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  }
}

function removeItemFromCart(e) {
console.log(e.target.id);
// console.log(cartId);
console.log(cart.items);
cart.removeItem(e.target.id);
console.log(cart.items);
clearCart();
showCart();

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table


}

// This will initialize the page and draw the cart on screen
renderCart();
