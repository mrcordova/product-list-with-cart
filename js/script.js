const dataResponse = await fetch("http://127.0.0.1:5500/data.json"); // for quokka testing
// const dataResponse = await fetch("../data.json");  for final live website
const data = await dataResponse.json();
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
const totalItemsInCart = document.querySelector("span[data-total-items");

const updateAmount = (e) => {
  const amount = e.currentTarget.parentElement.querySelector(".amount");
  let newVal = parseInt(e.currentTarget.getAttribute("data-amount"));
  let updatedAmount = parseInt(amount.textContent) + newVal;
  if (updatedAmount <= 0) {
    updatedAmount = 1;
  }
  amount.textContent = updatedAmount;
  updateItemsInCart(newVal);
};

const updateItemsInCart = (val) => {
  const oldAmount = parseInt(totalItemsInCart.getAttribute("data-total-items"));
  console.log(val + oldAmount ?? 0);
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
