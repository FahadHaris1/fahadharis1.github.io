let cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalAmount = document.getElementById("total-amount");
const expenseConatiner = document.querySelector(".expense-container");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addBtn = document.getElementById("add-btn");
const radioButtons = document.querySelectorAll(".currencyChooser input");

// Restore selected currency
const savedCurrency = localStorage.getItem("currency") || "india";
document.getElementById(savedCurrency).checked = true;

// Get currency symbol
function getCurrencySymbol() {
    const selected = document.querySelector(".currencyChooser input:checked");

    if (selected.id === "india") {
        return "₹";
    } else if (selected.id === "saudi") {
        return "SAR ";
    }
}

// Save selected currency
radioButtons.forEach((button) => {
    button.addEventListener("change", () => {
        localStorage.setItem("currency", button.id);
        renderCart();
        totalAmount.textContent = `${getCurrencySymbol()}${calculateTotal()}`;
    });
});

// Render expenses
function renderCart() {
    expenseConatiner.innerHTML = "";

    cart.forEach((item, index) => {
        expenseConatiner.innerHTML += `
            <div class="expense-card" data-index="${index}">
                <div>
                    <h3>${item.name}</h3>
                    <p>${getCurrencySymbol()}${item.amount}</p>
                </div>

                <div>
                    <p>${item.date}</p>
                </div>

                <div>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;
    });
}

renderCart();
totalAmount.textContent = `${getCurrencySymbol()}${calculateTotal()}`;

// Add expense
addBtn.addEventListener("click", () => {
    const inputName = expenseName.value.trim();
    const inputAmount = expenseAmount.value.trim();

    if (inputName === "" || inputAmount === "") {
        alert("Please Enter Expense name and Amount");
        return;
    }

    const todayDate = new Date();
    const today = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`;

    const cartItems = {
        name: inputName,
        amount: inputAmount,
        date: today
    };

    cart.push(cartItems);

    localStorage.setItem("cart", JSON.stringify(cart));

    expenseName.value = "";
    expenseAmount.value = "";

    renderCart();
    totalAmount.textContent = `${getCurrencySymbol()}${calculateTotal()}`;
});

// Delete expense
expenseConatiner.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const card = event.target.closest(".expense-card");
        const index = card.dataset.index;

        card.classList.add("fade-out");

        setTimeout(() => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
            totalAmount.textContent = `${getCurrencySymbol()}${calculateTotal()}`;
        }, 500);
    }
});

// Calculate total
function calculateTotal() {
    let total = 0;

    cart.forEach((item) => {
        total += Number(item.amount);
    });

    return total;
}
