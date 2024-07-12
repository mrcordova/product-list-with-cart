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

  // add item to orderList
  addListItem(name);

  const AddItemBtn =
    e.currentTarget.parentElement.querySelector(".add-cart-counter");

  e.currentTarget.classList.toggle("hide");

  AddItemBtn.classList.toggle("hide");

  updateItemsInCart(itemQuantity);
  changeCartView(itemQuantity);
};

const addListItem = (name) => {
  // <li class="list-item">
  //   <div class="item-info">
  //     <p class="item-title red-hat-text-600">Classic Tiramisu</p>
  //     <div class="item-prices">
  //       <p class="item-quantity red-hat-text-700">1x</p>
  //       <p class="item-price red-hat-text-600">@ $5.50</p>
  //       <p class="item-total-price red-hat-text-700">$5.50</p>
  //     </div>
  //   </div>
  //   <button class="remove-item-btn" value="-1">
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="10"
  //       height="10"
  //       fill="none"
  //       viewBox="0.5 0 10 10">
  //       <path
  //         fill="#CAAFA7"
  //         d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
  //       />
  //     </svg>
  //   </button>
  // </li>;

  const orderList = document.querySelector(".order-list");

  const liEle = document.createElement("li");
  liEle.classList.add("list-item");
  orderList.appendChild(liEle);

  const itemInfoDiv = document.createElement("div");
  itemInfoDiv.classList.add("item-info");
  liEle.appendChild(itemInfoDiv);

  const itemTitleP = document.createElement("p");
  itemTitleP.setAttribute("class", "item-title red-hat-text-600");
  const itemTitleText = document.createTextNode(`${name}`);
  itemTitleP.appendChild(itemTitleText);
  itemInfoDiv.append(itemTitleP);

  const itemPricesDiv = document.createElement("div");
  itemPricesDiv.classList.add("item-prices");
  itemInfoDiv.appendChild(itemPricesDiv);

  // "item-quantity red-hat-text-700",
  // "item-price red-hat-text-600",
  // "item-total-price red-hat-text-700",

  const quanityPara = document.createElement("p");
  const quanityParaText = document.createTextNode(
    `${orderListObj[name].quanity}x`
  );
  quanityPara.setAttribute("class", "item-quantity red-hat-text-700");
  quanityPara.appendChild(quanityParaText);

  const pricePara = document.createElement("p");
  const priceParaText = document.createTextNode(
    `@ $${orderListObj[name].price.toFixed(2)}`
  );
  pricePara.setAttribute("class", "item-price red-hat-text-600");
  pricePara.appendChild(priceParaText);

  const totalPricePara = document.createElement("p");
  const totalPriceParaText = document.createTextNode(
    `$${orderListObj[name].total.toFixed(2)}`
  );
  totalPricePara.setAttribute("class", "item-total-price red-hat-text-700");
  totalPricePara.appendChild(totalPriceParaText);

  itemPricesDiv.appendChild(quanityPara);
  itemPricesDiv.appendChild(pricePara);
  itemPricesDiv.appendChild(totalPricePara);

  // console.log(liEle);
};

const changeBtn = (e) => {
  const addItemBtn = e.currentTarget.parentElement;
  const addToCart = addItemBtn.previousElementSibling;

  // add item selected border
  const img = addToCart.previousElementSibling;
  img.classList.toggle("selected-item");

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

  // update quantity and total
  const name = e.currentTarget.parentElement.parentElement.parentElement
    .querySelector(".card-title")
    .textContent.trim();
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
