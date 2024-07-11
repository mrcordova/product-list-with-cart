const dataResponse = await fetch("http://127.0.0.1:5500/data.json"); // for quokka testing
// const dataResponse = await fetch("../data.json");  for final live website
const data = await dataResponse.json();
const addToCartBtns = document.querySelectorAll(".add-cart-container");
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
const totalItemsInCart = document.querySelector("span[data-total-items");
const cartMessage = document.querySelector(".cart-message");
const orderListDiv = document.querySelector(".order-list-container");
const removeItemBtns = document.querySelectorAll(".remove-item-btn");

console.log(data);
// console.log(orderListDiv.textContent);

const changeAddCartBtn = (e) => {
  const itemQuantity = parseInt(e.currentTarget.value);
  // let firstItem = true;
  // changeBtn(e);
  const AddItemBtn =
    e.currentTarget.parentElement.querySelector(".add-cart-counter");

  e.currentTarget.classList.toggle("hide");

  AddItemBtn.classList.toggle("hide");

  // console.log(e.currentTarget.value);
  updateItemsInCart(itemQuantity);
  changeCartView(itemQuantity);
};

const changeBtn = (e) => {
  const addItemBtn = e.currentTarget.parentElement;

  const addToCart = addItemBtn.previousElementSibling;

  addToCart.classList.toggle("hide");
  addItemBtn.classList.toggle("hide");
};

const removeItem = (e) => {
  const itemQuantity = parseInt(e.currentTarget.value);
  const oldAmount = parseInt(totalItemsInCart.getAttribute("data-total-items"));

  updateItemsInCart(itemQuantity);

  changeCartView(oldAmount + itemQuantity > 0 ? true : false);
};

const changeCartView = (firstItem) => {
  cartMessage.classList.toggle("hide", firstItem);
  orderListDiv.classList.toggle("hide", !firstItem);
};

const updateAmount = (e) => {
  const amount = e.currentTarget.parentElement.querySelector(".amount");
  let newVal = parseInt(e.currentTarget.getAttribute("data-amount"));
  let updatedAmount = parseInt(amount.textContent) + newVal;
  if (updatedAmount <= 0) {
    updatedAmount = 1;
    newVal = -1;
    changeBtn(e);
    changeCartView(
      parseInt(totalItemsInCart.getAttribute("data-total-items")) + newVal
    );
  }
  amount.textContent = updatedAmount;
  updateItemsInCart(newVal);
};

const updateItemsInCart = (val) => {
  const oldAmount = parseInt(totalItemsInCart.getAttribute("data-total-items"));
  // console.log(val);
  totalItemsInCart.setAttribute(
    "data-total-items",
    oldAmount + val > 0 ? oldAmount + val : 0
  );

  totalItemsInCart.textContent = `(${totalItemsInCart.getAttribute(
    "data-total-items"
  )})`;
};

for (const plusBtn of plusBtns) {
  plusBtn.addEventListener("click", updateAmount);
}
for (const minusBtn of minusBtns) {
  minusBtn.addEventListener("click", updateAmount);
  // minusBtn.addEventListener("click", changeBtn);
}

for (const addToCartBtn of addToCartBtns) {
  addToCartBtn.addEventListener("click", changeAddCartBtn);
}

for (const removeItemBtn of removeItemBtns) {
  removeItemBtn.addEventListener("click", removeItem);
}
