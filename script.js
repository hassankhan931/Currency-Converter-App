const API_URL = "https://v6.exchangerate-api.com/v6/faf2fae22ed4ea0bfc03b0f8/latest";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const currencyCodes = Object.keys(countryList);

dropdowns.forEach((select) => {
  currencyCodes.forEach((code) => {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;
    if (select.name === "from" && code === "USD") option.selected = true;
    if (select.name === "to" && code === "PKR") option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});

function updateFlag(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

async function updateExchangeRate() {
  let amountInput = document.querySelector(".amount input");
  let amt = parseFloat(amountInput.value) || 1;
  amountInput.value = amt;

  const from = fromCurr.value;
  const to = toCurr.value;

  const url = `${API_URL}/${from}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    const converted = (amt * rate).toFixed(2);
    msg.innerText = `${amt} ${from} = ${converted} ${to}`;
  } catch (err) {
    msg.innerText = "Failed to fetch exchange rate.";
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
  dropdowns.forEach(select => updateFlag(select));
});
