const {
  getAllUsers,
  getCurrent,
  updatedUser,
  withDrawAndDepositUser,
  updatedStatusWithDraw,
  getDeleteUserById,
  getGetUserById,
  DepositUser,
} = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();
router.get("/", [verifyToken], getAllUsers);
router.get("/getUserById/:id", [verifyToken], getGetUserById);

router.get("/get-current", verifyToken, getCurrent);
router.put("/update/:id", verifyToken, updatedUser);
router.put("/update/desposit/:id", [verifyToken, isAdmin], DepositUser);

router.delete("/delete/:id", verifyToken, getDeleteUserById);

router.put("/updateMoney/:id", verifyToken, withDrawAndDepositUser);
router.put(
  "/updateStatus/:WithDrawId/:userId",
  [verifyToken, isAdmin],
  updatedStatusWithDraw
);

module.exports = router;
