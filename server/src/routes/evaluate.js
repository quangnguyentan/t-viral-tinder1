const {
  getLotteryById,
  createLottery,
  getAllLottery,
  updateLottery,
  updateLotteryAndUsers,
} = require("../controllers/evaluateController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();

router.get("/lottery", getAllLottery);
router.put("/lottery/updated/:roomId/:userId", [verifyToken], updateLottery);
router.put(
  "/lottery/updateUserIntoRoom/:roomId/:userId",
  [verifyToken],
  updateLotteryAndUsers
);

router.get("/lottery/:roomId/:userId", [verifyToken], getLotteryById);
router.post("/lottery/create", [verifyToken, isAdmin], createLottery);

module.exports = router;
