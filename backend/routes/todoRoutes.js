const express = require("express");
const {
  newTodo,
  myTodos,
  deleteTodo,
} = require("../controllers/todoController");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/newTodo").post(isAuthenticatedUser, newTodo);
router.route("/myTodos").get(isAuthenticatedUser, myTodos);
router
  .route("/todo/:id")
  .delete(isAuthenticatedUser, deleteTodo);

module.exports = router;
