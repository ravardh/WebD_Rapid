const from = document.getElementById("from");
const to = document.getElementById("to");

const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

async function convert() {
  const from = document.getElementById("from").value.split(",")[0];
  const to = document.getElementById("to").value.split(",")[0];
  const amt = document.getElementById("original").value.trim();

  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

  const response = await fetch(URL);
  const data = await response.json();
  const rates = data[from];

  const newAmt = amt * rates[to];
  document.getElementById("converted").innerText = newAmt;
}

async function autofill() {
  const response = await fetch("./codes.json");
  const data = await response.json();

  data.forEach((element) => {
    if (element.Currency_Code) {
      const o = document.createElement("option");
      o.value = element.Currency_Code + "," + element.Country_Code; //inr,IN
      o.innerText = element.Country;

      from.appendChild(o);
    }
  });

  data.forEach((element) => {
    if (element.Currency_Code) {
      const o = document.createElement("option");
      o.value = element.Currency_Code + "," + element.Country_Code; //inr,IN
      o.innerText = element.Country;

      to.appendChild(o);
    }

    from.value = "inr,IN";
    to.value = "inr,IN";
    fromFlag.src = "https://flagsapi.com/IN/flat/24.png";
    toFlag.src = "https://flagsapi.com/IN/flat/24.png";
  });
}

autofill();

from.addEventListener("change", changeFlag1);
to.addEventListener("change", changeFlag2);

function changeFlag1() {
  const Country = from.value.split(",")[1];
  fromFlag.src = `https://flagsapi.com/${Country}/flat/24.png`;
}

function changeFlag2() {
  const Country = to.value.split(",")[1];
  toFlag.src = `https://flagsapi.com/${Country}/flat/24.png`;
}
