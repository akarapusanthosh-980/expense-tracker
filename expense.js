const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function addTransactionDOM(transaction){

    const sign =
    transaction.amount < 0 ? "minus" : "plus";

    const item = document.createElement("li");

    item.classList.add(sign);

    item.innerHTML = `
        ${transaction.text}
        <span>
            ₹${transaction.amount}
        </span>
        <button
        class="delete-btn"
        onclick="removeTransaction(${transaction.id})">
        X
        </button>
    `;

    list.appendChild(item);
}

function updateValues() {

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expense += Math.abs(transaction.amount);
        }

    });

    const total = income - expense;

    balance.innerText = `₹${total}`;
    moneyPlus.innerText = `₹${income}`;
    moneyMinus.innerText = `₹${expense}`;
}

function removeTransaction(id){

    transactions =
    transactions.filter(
        transaction => transaction.id !== id
    );

    updateLocalStorage();
    init();
}

function init(){

    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);

    updateValues();
}

function addTransactionDOM(transaction) {

    const item = document.createElement("li");

    if (transaction.amount < 0) {
        item.classList.add("minus");
    }

    item.innerHTML = `
        ${transaction.text}
        <span>₹${transaction.amount}</span>
        <button class="delete-btn"
        onclick="removeTransaction(${transaction.id})">
        X
        </button>
    `;

    list.appendChild(item);
}

form.addEventListener(
    "submit",
    addTransaction
);

init();