const Expense = require("../model/expense");

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => console.log(err.message));
};

exports.addExpense = (req, res, next) => {
  console.log(req.body);
  Expense.create({
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => console.log(err.message));
};

exports.editExpense = (req, res, next) => {
  const expenseId = req.params.id;
  //   console.log(req.body);
  Expense.update(
    {
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    },
    { where: { id: expenseId } }
  )
    .then((expense) => {
      // console.log(expense);
      res.json({
        id: expenseId,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
      });
    })
    .catch((err) => console.log(err.message));
};

exports.deleteExpense = (req, res, next) => {
  const expenseId = req.params.id;
  Expense.findByPk(expenseId)
    .then((expense) => {
      expense
        .destroy()
        .then(() => {
          res.json(expense);
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};
