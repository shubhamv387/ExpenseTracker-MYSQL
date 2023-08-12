window.addEventListener("DOMContentLoaded", showOnReload);

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount");
  const description = document.getElementById("description");
  const category = document.getElementById("category");

  //creating a unique ID for each Expense Obj
  // let keyId = new Date().getTime();
  const ExpenseObj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };

  axios
    .post("http://localhost:4000/api/expenses/add-expense", ExpenseObj)
    .then((res) => {
      console.log(res.data);
      showUserOnScreen(res.data);
    })
    .catch((err) => console.log(err.message));

  // resetting the input fields after submission
  amount.value = "";
  description.value = "";
  category.value = "";
});

function showUserOnScreen(ExpenseObj) {
  const expenseList = document.getElementById("expenseList");

  //creating a new li element
  const expense = document.createElement("li");
  expense.className = "expenseLi";

  expense.innerHTML = `<div class = "d-block mb-2 text-capitalize"> <span class = "fw-bold"> Amount:</span> ${ExpenseObj.amount} INR <br> <span class = "fw-bold"> Description:</span> ${ExpenseObj.description} <br> <span class = "fw-bold"> Category:</span> ${ExpenseObj.category} </div>`;

  //Adding Edit Btn to each li element
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-success d-inline-block me-2 ";
  editBtn.appendChild(document.createTextNode("EDIT"));
  expense.appendChild(editBtn);

  editBtn.addEventListener("click", editExpense);

  function editExpense() {
    document.getElementById("amount").value = ExpenseObj.amount;
    document.getElementById("description").value = ExpenseObj.description;
    document.getElementById("category").value = ExpenseObj.category;
    document.getElementById("amount").focus();

    // let updatedExpense = {
    //   amount: document.getElementById("amount").value,
    //   description: document.getElementById("description").value,
    //   category: document.getElementById("category").value,
    // };

    axios
      .delete(
        `http://localhost:4000/api/expenses/delete-expense/${ExpenseObj.id}`
      )
      .then((updatedExpense) => {
        expenseList.removeChild(expense);
        console.log(updatedExpense);
        // showUserOnScreen(updatedExpense);
      })
      .catch((err) => console.log(err.message));
  }
  //Adding delete Btn to each li element
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger d-inline-block ";
  deleteBtn.appendChild(document.createTextNode("DELETE"));

  expense.append(deleteBtn);

  //Appening the li element to the ul element
  expenseList.append(expense);

  deleteBtn.addEventListener("click", deleteExpense);

  function deleteExpense() {
    axios
      .delete(
        `http://localhost:4000/api/expenses/delete-expense/${ExpenseObj.id}`
      )
      .then((res) => {
        expenseList.removeChild(expense);
      })
      .catch((err) => console.log(err.message));
  }
}

function showOnReload() {
  axios
    .get("http://localhost:4000/api/expenses/")
    .then((expenses) => {
      expenses.data.forEach((expense) => {
        showUserOnScreen(expense);
      });
    })
    .catch((err) => console.log(err.message));
}
