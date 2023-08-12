const express = require("express");
const router = express.Router();

const expenseController = require("../controller/expense");

// GET  /api/expenses
router.get("/", expenseController.getExpenses);

// POST  /api/expenses
router.use("/add-expense", expenseController.addExpense);

// PUT  /api/expenses
router.put("/edit-expense/:id", expenseController.editExpense);

// DELETE  /api/expenses
router.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
