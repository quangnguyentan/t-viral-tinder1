const users = require("../models/users");
const withDraw = require("../models/withDraw");

const getAllDeposit = async (req, res) => {
  const lotteries = await withDraw.find();
  console.log(lotteries);

  return res.status(200).json({
    success: lotteries ? true : false,
    lotteries,
  });
};
const getAllWithDraw = async (req, res) => {
  const lotteries = await evaluate.find();
  console.log(lotteries);

  return res.status(200).json({
    success: lotteries ? true : false,
    lotteries,
  });
};
const getWithDrawById = async (req, res) => {
  const { id } = req.params;
  const findWithDraw = await withDraw.find().populate({
    path: "users",
  });
  console.log(findWithDraw);
  let withDraws;
  if (findWithDraw) {
    withDraws = findWithDraw?.filter(
      (draw) => draw.users?._id.toString() === id
    );
  }

  console.log(withDraws);

  return res.status(200).json({
    success: withDraws ? true : false,
    withDraws,
  });
};
module.exports = {
  getAllDeposit,
  getAllWithDraw,
  getWithDrawById,
};
