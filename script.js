const form = document.querySelector("form");
const result = document.getElementById("result-container");
const button = document.querySelector("button");
const start_number = document.getElementById("start-number");
const end_number = document.getElementById("end-number");
const amount = document.getElementById("amount");
const resubmit_button = document.getElementById("resubmit-button");
const number_picker = document.getElementById("number-picker");
const count_result = document.getElementById("count-result");
const toggle = document.getElementById("switch");
const numbers_result = document.getElementById("numbers-result");

let form_removed = null;
let result_removed = result;
let count = 1;

button.addEventListener("click", (event) => {
  event.preventDefault();

  const start = parseInt(start_number.value, 10);
  const end = parseInt(end_number.value, 10);
  const amt = parseInt(amount.value, 10);

  if (isNaN(start) || isNaN(end) || isNaN(amt)) {
    alert("Por favor, insira valores válidos.");
    return;
  }

  try {
    const result_array = randomNumbers(start, end, amt);

    if (count > 1) {
      number_picker.append(result_removed);
    }

    count_result.textContent = count;
    form_removed = form;
    form.remove();
    result.classList.remove("display-none");

    numbers_result.innerHTML = "";

    for (const allNumbers of result_array) {
      const pElement = document.createElement("p");
      pElement.textContent = allNumbers;
      numbers_result.appendChild(pElement);
    }
  } catch (error) {
    alert(error.message); // Mostra o erro ao usuário
  }
});

resubmit_button.addEventListener("click", () => {
  result.classList.add("display-none");
  number_picker.prepend(form_removed);
  count++;
});

function randomNumbers(start, end, amt = 1) {
  if (start > end) 
    [start, end] = [end, start];

  if (amt > end - start + 1 && toggle.checked) {
    throw new Error('Quantidade maior que o intervalo disponível.');
  }
  
  const numbers = [];

  while (numbers.length < amt) {
    const number = Math.floor(Math.random() * (end - start + 1)) + start;
    
    if (!toggle.checked) {
      numbers.push(number);
    } else {

      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
  }

  return numbers;
}