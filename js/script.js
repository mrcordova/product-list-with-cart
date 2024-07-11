const dataResponse = await fetch("http://127.0.0.1:5500/data.json"); // for quokka testing
// const dataResponse = await fetch("../data.json");  for final live website
const data = await dataResponse.json();
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");

// console.log(data);

const updateAmount = (e) => {
  const amount = e.currentTarget.parentElement.querySelector(".amount");
  let newVal = parseInt(e.currentTarget.getAttribute("data-amount"));
  let updatedAmount = parseInt(amount.textContent) + newVal;
  if (updatedAmount <= 0) {
    updatedAmount = 1;
  }
  amount.textContent = updatedAmount;
};

for (const plusBtn of plusBtns) {
  plusBtn.addEventListener("click", updateAmount);
}
for (const minusBtn of minusBtns) {
  minusBtn.addEventListener("click", updateAmount);
}
