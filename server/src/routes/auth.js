const {
  register,
  getAllUsers,
  login,
} = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();
router.get("/", [verifyToken], getAllUsers);
router.post("/login", login);
router.post("/register", register);
module.exports = router;
