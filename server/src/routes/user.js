const {
  getAllUsers,
  getCurrent,
  updatedUser,
  withDrawAndDepositUser,
  updatedStatusWithDraw,
} = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();
router.get("/", [verifyToken], getAllUsers);
router.get("/get-current", verifyToken, getCurrent);
router.put("/update/:id", verifyToken, updatedUser);
router.put("/updateMoney/:id", verifyToken, withDrawAndDepositUser);
router.put(
  "/updateStatus/:WithDrawId/:userId",
  [verifyToken, isAdmin],
  updatedStatusWithDraw
);

module.exports = router;
