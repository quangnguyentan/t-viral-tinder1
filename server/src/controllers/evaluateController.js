const evaluate = require("../models/evaluate");
const users = require("../models/users");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const createLottery = async (req, res) => {
  try {
    const { period, result, room } = req.body;

    const newEvaluate = await evaluate.create({
      period,
      result,
      room,
    });
    newEvaluate.save();
    return res.status(200).json({
      success: newEvaluate
        ? "Successfully created"
        : "Failed to create evaluate",
      newEvaluate,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getAllLottery = async (req, res) => {
  const lotteries = await evaluate.find();

  return res.status(200).json({
    success: lotteries ? true : false,
    lotteries,
  });
};
const updateLottery = async (req, res) => {
  try {
    const { userId, roomId } = req.params;
    let data = await evaluate.findOne({ room: roomId });
    const { money, result } = req.body;

    // console.log(evaluates?.result?.at(-1)?.sort());
    // toLowerCase()
    // let user = await evaluate.findOne({ "users._id": userId });
    // console.log(user);
    // if (!user) {

    // }

    const newData = await evaluate.findOneAndUpdate(
      { room: roomId },
      {
        $push: {
          users: {
            money: money,
            UserId: userId,
            result: result,
            periodNumber: data?.periodNumber?.at(-1) + 1,
          },
          // "users.money": money,
          // "users.id": userId,
          // "users.result": result,
          // "users.periodNumber": data?.periodNumber?.at(-1),
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: data ? true : false,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const updateLotteryAndUsers = async (req, res) => {
  try {
    const { userId, roomId } = req.params;
    const { money } = req.body;
    console.log(money);
    let data = await evaluate.findOne({ room: roomId });
    console.log(userId);
    const user = await users.findById(userId);
    const findUser = data?.users.filter((user) => {
      return user?.UserId === userId;
    });
    //     const sameArray =
    //   array1.length === array2.length &&
    //   array2.sort().every((value, index) => {
    //     console.log("result", value.toUpperCase());
    //     console.log("users", array1[index]);
    //     return value.toUpperCase() === array1[index];
    //   });
    // console.log(sameArray);
    const findResult = data?.result?.at(-1)?.sort();
    console.log(findResult);
    // console.log(findResult);
    // findResult?.map((el) => {
    //   console.log(el?.toUpperCase());
    // });
    const filterUserChosen = findUser.reduce((acc, user) => {
      if (user?.periodNumber === data?.periodNumber.at(-1)) {
        acc.push(
          // user?.result?.map((value, index) => {
          //   const upperCaseValue = value?.toUpperCase(); // Handle undefined/null values gracefully
          //   console.log("value", value);
          //   console.log("find", findResult[index].toUpperCase());

          //   console.log(upperCaseValue === findResult[index].toUpperCase());
          //   return upperCaseValue === findResult[index].toUpperCase();
          // })

          findResult?.map((value, index) => {
            const upperCaseValue = value?.toUpperCase();
            // console.log(user?.result);
            // console.log(upperCaseValue);
            // user?.result?.map((rs, index) => {

            // })

            // console.log(user?.result.includes(upperCaseValue));
            let win;
            let x = [];

            // let lose;
            // let draw;
            // console.log();

            if (user?.result?.length === 1) {
              win = user?.result?.some((rs) => {
                console.log(rs === upperCaseValue);

                if (rs === upperCaseValue) {
                  console.log("abc");
                } else {
                  console.log("xyz");
                }
                // return rs?.includes(upperCaseValue);
              });
            }
            if (user?.result.length === 2) {
              win = user?.result.includes(upperCaseValue);
            }
            // console.log("value", upperCaseValue);
            // console.log("find", user?.result);
            // return upperCaseValue === user?.result[index];
            return win;
          })
        );
      }
      return acc;
    }, []);
    let hasOnlyTrue;
    console.log(filterUserChosen);
    // hasOnlyTrue = filterUserChosen.every((values) => {
    //   console.log(values);
    //   return values.some((value) => value === true);
    // });
    if (filterUserChosen?.length === 2) {
      // hasOnlyTrue = filterUserChosen.every((values) => {
      //   console.log(values);
      //   // Kiểm tra nếu có ít nhất một giá trị false trong mảng con
      //   return !values.some((value) => value === false);
      // });
    }

    console.log(hasOnlyTrue);
    // if (hasOnlyTrue) {
    //   console.log("Có dữ liệu");
    //   const newData = await users.findByIdAndUpdate(user?._id, {
    //     withDraw: user?.withDraw + money,
    //   });
    //   console.log("Có dữ liệu", newData);
    // } else {
    //   console.log("Không có dữ liệu");
    //   const newData = await users.findByIdAndUpdate(user?._id, {
    //     withDraw: user?.withDraw - money,
    //   });
    //   console.log("Không có dữ liệu", newData);
    // }
    // const newUpdate = await users?.findByIdAndUpdate(data?._id, {

    // })
    // console.log(evaluates?.result?.at(-1)?.sort());
    // toLowerCase()
    // let user = await evaluate.findOne({ "users._id": userId });
    // console.log(user);
    // if (!user) {

    // }

    return res.status(200).json({
      success: data ? true : false,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getLotteryById = async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    // Tìm bản ghi cần cập nhật
    const evaluates = await evaluate.findOne({ room: roomId });

    // const updatePromise = new Promise(async (resolve, reject) => {
    //   cron.schedule("* * * * * *", async () => {
    //     if (evaluates?.period) {
    //       const hours = Math.floor(evaluates?.period / 3600);
    //       const minutes = Math.floor((evaluates?.period / 3600) * 60);
    //       const seconds = evaluates?.period % 60;
    //       evaluates.formatTime = [hours, minutes, seconds];
    //       evaluates.period -= 1;
    //     } else {
    //       evaluates.period = 180;
    //     }
    //     await evaluates.save();
    //     resolve(); // Resolve the promise after saving
    //   });
    // });
    // await updatePromise;
    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};
module.exports = {
  createLottery,
  getAllLottery,
  updateLottery,
  getLotteryById,
  updateLotteryAndUsers,
};
