/* global Product, Cart */

'use strict';

const cartPreview = document.getElementById('cartContents');
// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    console.log(i);
    const optionElem = document.createElement('option');
    optionElem.setAttribute('value',i);
    optionElem.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionElem);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault()
  console.log(event);
  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview(event);

}

function addSelectedItemToCart(event) {
  let product = event.target.items.value;
  let quantity = event.target.quantity.value;
  cart.addItem(product,quantity);
}

const cartCounter = document.getElementById('itemCount');
function updateCounter() {
  cartCounter.innerHTML = ''
  let cartCount = 0;
  for (let i=0; i<cart.items.length; i++) {
    cartCount += Number(cart.items[i].quantity);
  }
  cartCounter.textContent = cartCount;
}

function updateCartPreview(event) {
  let cartItemName = Product.allProducts[event.target.items.value].name;
  let cartItemQuantity = event.target.quantity.value;
  const previewItem = document.createElement('p');
  previewItem.textContent = `Product: ${cartItemName} Quantity: ${cartItemQuantity}`
  cartPreview.appendChild(previewItem);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
