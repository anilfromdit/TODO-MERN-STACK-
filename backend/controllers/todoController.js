const Todo = require("../models/todoModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");

//Create new Todo
exports.newTodo = handleAsync(async (req, res, next) => {
  const {
    title,
    description
  } = req.body;

  const newTodo = await Todo.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json({ success: true, newTodo });
});


//get my Todo(s)
exports.myTodos = handleAsync(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    todos,
  });
});



//delete todo
exports.deleteTodo = handleAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(new ErrorHandler(`Todo not found`, 404));
  }
  await todo.remove();
  res.status(200).json({
    success: true,
  });
});
