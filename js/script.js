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

const orderListObj = {};
for (const obj of data) {
  orderListObj[obj["name"]] = {
    price: obj["price"],
    image: obj["image"],
    category: obj["category"],
    quanity: 0,
    total: 0,
  };
}
// console.log(orderListObj);
const changeAddCartBtn = (e) => {
  const itemQuantity = parseInt(e.currentTarget.value);

  const card = e.currentTarget.parentElement.parentElement;

  // add item selected border
  const img = card.querySelector("picture");
  img.classList.toggle("selected-item");

  // update order list obj
  const name = card.querySelector(".card-title").textContent.trim();
  orderListObj[name].quanity += 1;
  orderListObj[name].total += orderListObj[name].price;

  const AddItemBtn =
    e.currentTarget.parentElement.querySelector(".add-cart-counter");

  e.currentTarget.classList.toggle("hide");

  AddItemBtn.classList.toggle("hide");

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

  const name = e.currentTarget.parentElement.parentElement.parentElement
    .querySelector(".card-title")
    .textContent.trim();

  let newVal = parseInt(e.currentTarget.getAttribute("data-amount"));
  let updatedAmount = parseInt(amount.textContent) + newVal;

  orderListObj[name].quanity += newVal;
  orderListObj[name].total += newVal * orderListObj[name].price;

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

  console.log(orderListObj[name]);
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
}

for (const addToCartBtn of addToCartBtns) {
  addToCartBtn.addEventListener("click", changeAddCartBtn);
}

for (const removeItemBtn of removeItemBtns) {
  removeItemBtn.addEventListener("click", removeItem);
}
