const evaluate = require("../models/evaluate");
const users = require("../models/users");
const getRandomTwo = require("../utils/randomLottery");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
let array = ["A", "B", "C", "D"];
const updateTimer = async (req, res) => {
  try {
    let findRoom;
    findRoom = await evaluate.find();
    if (findRoom?.length === 0) throw new Error("Hiện tại chưa có phòng nào");
    // let endTime = localStorage.getItem("endTime");
    // if (!endTime) {
    //   endTime = new Date().getTime() + 3 * 60 * 1000; // 3 phút từ bây giờ
    //   localStorage.setItem("endTime", endTime);
    // }
    const updatePromises = findRoom.map(async (find) => {
      // Perform updates inside the promise
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          timer: new Date().getTime() + 3 * 60 * 1000,
        },
        { new: true }
      );
    });

    await Promise.all(updatePromises);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const countdown = async (req, res) => {
  try {
    let findRoom;
    findRoom = await evaluate.find();
    console.log(findRoom[0]?.resultUpdate.length);
    if (findRoom?.length === 0) throw new Error("Hiện tại chưa có phòng nào");
    const updatePromises = findRoom.map(async (find) => {
      // Perform updates inside the promise
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          periodNumber: [...find.periodNumber, find.periodNumber.length + 1],
          result: [
            ...find.result,
            find?.resultUpdate?.length > 0
              ? find.resultUpdate.at(-1)
              : getRandomTwo(array),
          ],
        },
        { new: true }
      );
    });

    await Promise.all(updatePromises);
    const removedPromises = findRoom.map(async (find) => {
      // Perform updates inside the promise
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          $pullAll: {
            resultUpdate: find?.resultUpdate,
          },
        },
        { new: true }
      );
    });
    await Promise.all(removedPromises);
    return res.status(200).json({
      success: findRoom ? true : false,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const updateLotteryAndUsers = async (req, res) => {
  try {
    const { userId, roomId } = req.params;
    let findRoom;
    findRoom = await evaluate.find();
    console.log(findRoom[0]?.resultUpdate.length);
    if (findRoom?.length === 0) throw new Error("Hiện tại chưa có phòng nào");
    const updatePromises = findRoom.map(async (find) => {
      // Perform updates inside the promise
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          periodNumber: [...find.periodNumber, find.periodNumber.length + 1],
          result: [
            ...find.result,
            find?.resultUpdate?.length > 0
              ? find.resultUpdate.at(-1)
              : getRandomTwo(array),
          ],
        },
        { new: true }
      );
    });

    await Promise.all(updatePromises);
    const removedPromises = findRoom.map(async (find) => {
      // Perform updates inside the promise
      return await evaluate.findOneAndUpdate(
        { room: find?.room },
        {
          $pullAll: {
            resultUpdate: find?.resultUpdate,
          },
        },
        { new: true }
      );
    });
    await Promise.all(removedPromises);
    let data = await evaluate.findOne({ room: roomId });
    let getLottery = await evaluate.find();
    const findResults = getLottery?.map((eva) => {
      return eva?.result?.at(-1)?.sort();
    });
    let user = await users.findById(userId);
    const findUser = data?.users.filter((user) => {
      return user?.UserId === userId;
    });
    const findUsers = getLottery?.map((el) =>
      el?.users?.filter((user) => user?.UserId === userId)
    );
    const findResult = data?.result?.at(-1)?.sort();
    let filterPeriodNumber = getLottery?.map((el) => el?.periodNumber.at(-1));
    let filterUserChosen = [];
    let accOneLottery = findUsers?.map((el, indexValue) =>
      el?.filter((user, index) => {
        if (
          filterPeriodNumber?.includes(user?.periodNumber) &&
          user?.result?.length === 1
        ) {
          user.resultValue = findResults[indexValue];

          let resultNew = user?.result?.map((rs, index) => {
            return findResults[0]?.includes(rs);
          });
          return filterUserChosen.push(resultNew);
        }
      })
    );

    let filterUserChosen1 = [];
    let acc = findUsers?.map((el, indexValue) =>
      el?.filter((user) => {
        if (
          filterPeriodNumber?.includes(user?.periodNumber) &&
          user?.result?.length === 2
        ) {
          user.resultValue = findResults[indexValue];

          let resultNew = user?.result?.map((rs) => {
            return findResults[0]?.includes(rs);
          });
          return filterUserChosen1.push(resultNew);
        }
      })
    );
    let hasOnlyTrue;
    let lostMoney;

    function hasCommonCharacters(str1, str2) {
      const set1 = new Set(str1);
      const set2 = new Set(str2);

      const intersection = new Set([...set1].filter((x) => set2.has(x)));

      return intersection.size > 0;
    }
    let newUpdateOneRoom = accOneLottery?.map((el) =>
      el?.filter(async (rs) => {
        if (hasCommonCharacters(rs?.resultValue, rs?.result)) {
          console.log("Ăn");
          await users.findByIdAndUpdate(
            user?._id,
            {
              withDraw: user?.withDraw + rs?.money,
            },
            { new: true }
          );
        } else {
          console.log("Thua");
          await users.findByIdAndUpdate(
            user?._id,
            {
              withDraw: user?.withDraw - rs?.money,
            },
            { new: true }
          );
        }
      })
    );
    await Promise.all(newUpdateOneRoom);
    let newUpdateThanTwoRoom = acc?.map(async (el) =>
      el?.filter(async (rs) => {
        if (JSON.stringify(rs?.resultValue) === JSON.stringify(rs?.result)) {
          console.log("Ăn 2 cửa");
          const newData3 = await users.findByIdAndUpdate(
            user?._id,
            {
              withDraw: user?.withDraw + rs?.money * 2,
            },
            { new: true }
          );
          console.log(newData3);
        } else if (hasCommonCharacters(rs?.resultValue, rs?.result)) {
          console.log("Huề");
          const newData = await users.findByIdAndUpdate(
            user?._id,
            {
              withDraw: user?.withDraw,
            },
            { new: true }
          );
          console.log(newData);
        } else {
          console.log("Thua 2 cửa");
          const newData4 = await users.findByIdAndUpdate(
            user?._id,
            {
              withDraw: user?.withDraw - rs?.money * 2,
            },
            { new: true }
          );
          console.log(newData4);
        }
      })
    );
    await Promise.all(newUpdateThanTwoRoom);

    // const filterAcc = acc?.filter((accFil) => accFil.length > 0);
    // if (filterUserChosen?.length > 0) {
    //   hasOnlyTrue = filterUserChosen.every((values) => {
    //     if (values) {
    //       return values.some((value) => value === true);
    //     }
    //   });
    //   lostMoney = filterUserChosen.every((values) => {
    //     if (values) {
    //       return values.every((value) => value === false);
    //     }
    //   });
    // }

    // if (hasOnlyTrue) {
    //   console.log("Ăn 1 cửa");
    //   const newData1 = await users.findByIdAndUpdate(
    //     user?._id,
    //     {
    //       withDraw: user?.withDraw + findUser?.at(-1)?.money,
    //     },
    //     { new: true }
    //   );
    //   console.log(newData1);
    // }
    // if (lostMoney) {
    //   console.log("Thua 1 cửa");
    //   const newData2 = await users.findByIdAndUpdate(
    //     user?._id,
    //     {
    //       withDraw: user?.withDraw - findUser?.at(-1)?.money,
    //     },
    //     { new: true }
    //   );
    //   console.log(newData2);
    // }
    // if (hasOnlyTrue1) {
    //   console.log("Ăn 2 cửa");
    //   const newData3 = await users.findByIdAndUpdate(user?._id, {
    //     withDraw: user?.withDraw + findUser?.at(-1)?.money * 2,
    //   });
    //   console.log(newData3);
    // }
    // if (hasOnlyTrue2) {
    //   console.log("Huề");
    //   const newData = await users.findByIdAndUpdate(user?._id, {
    //     withDraw: user?.withDraw,
    //   });
    //   console.log(newData);
    // }
    // if (hasOnlyTrue3) {
    //   console.log("Thua 2 cửa");
    //   const newData4 = await users.findByIdAndUpdate(user?._id, {
    //     withDraw: user?.withDraw - findUser?.at(-1)?.money * 2,
    //   });
    //   console.log(newData4);
    // }
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const createLottery = async (req, res) => {
  try {
    const { period, result, room } = req.body;

    const newEvaluate = await evaluate.create({
      period,
      result,
      room,
      image: req.files.images[0].filename,
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
const updateLotteryResult = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { resultUpdate } = req.body;

    const newEvaluate = await evaluate.findOneAndUpdate(
      { room: roomId },
      {
        resultUpdate,
      },
      {
        new: true,
      }
    );
    newEvaluate?.save();
    return res.status(200).json({
      success: newEvaluate
        ? "Successfully update"
        : "Failed to update evaluate",
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
    console.log(money);
    if (!result.length > 0)
      return res.status(400).json({
        message: "Vui lòng chọn cược",
      });
    if (!money || money < 1)
      return res.status(400).json({
        message: "Vui lòng nhập số tiền lớn hơn 1",
      });
    if (
      data &&
      data.users.at(-1)?.UserId === userId &&
      data?.periodNumber?.at(-1) + 1 === data?.users?.at(-1)?.periodNumber
    )
      return res.status(400).json({
        message: "Bạn đã đặt cược rồi! Vui lòng đợi kết quả ",
      });
    // console.log(evaluates?.result?.at(-1)?.sort());
    // toLowerCase()
    // let user = await evaluate.findOne({ "users._id": userId });
    // console.log(user);
    // if (!user) {

    // }

    await evaluate.findOneAndUpdate(
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
      message: data && "Đánh giá thành công vui lòng đợi có kết quả!",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    let evaluates = await evaluate.findOne({ room: roomId });

    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};
const getLotteryById = async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    const evaluates = await evaluate.findOne({ room: roomId });

    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};

const getLotteryHistory = async (req, res) => {
  try {
    const { roomId, userId } = req.params;

    // Tìm bản ghi cần cập nhật
    const evaluates = await evaluate.findOne({ room: roomId });

    // await updatePromise;
    return res.status(200).json({
      success: evaluates ? true : false,
      evaluates,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời gian:", error);
  }
};
const deleteLotteryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const lottery = await evaluate?.findByIdAndDelete(id);
    console.log(lottery);
    return res.status(200).json({
      success: lottery ? true : false,
      lottery,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createLottery,
  getAllLottery,
  updateLottery,
  getLotteryById,
  updateLotteryAndUsers,
  getLotteryHistory,
  getRoomById,
  updateLotteryResult,
  countdown,
  deleteLotteryById,
  updateTimer,
};
