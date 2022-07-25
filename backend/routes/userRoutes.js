const  express = require("express");
const { isAuthenticatedUser} = require("../middleware/auth");

const {
    registerUser,
    loginUser,
    logout,
    getUserDetails,
    updatePassword,
    updateProfile,
  } = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router
    .route("/profile/updatePassword")
    .put(isAuthenticatedUser, updatePassword);

router.route("/logout").get(logout);

module.exports = router;
