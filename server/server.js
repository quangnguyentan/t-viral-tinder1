const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./src/configs/connectDB");
const initRoutes = require("./src/routes");
const http = require("http");
global.__basedir = __dirname;
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const { Server } = require("socket.io");
const evaluate = require("./src/models/evaluate");
const getRandomTwo = require("./src/utils/randomLottery");
const users = require("./src/models/users");
const timeEnd = require("./src/models/timeEnd");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: "*",
    // origin: "http://192.168.1.7:5173",

    methods: ["GET", "POST"],
  },
});

require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    origin: "*",
    // origin: "http://192.168.1.7:5173",

    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.io = io;
  next();
});
connectDB();
initRoutes(app);
const array = ["a", "b", "c", "d"];
const timeRoom = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
io.on("connection", async (socket) => {
  // socket.on("room", async (data) => {
  //   console.log(data?.room);
  //   let lottery = await evaluate.findOne({ room: data?.room });
  //   if (!lottery) throw new Error("No have rooms");
  //   if (lottery.length === 0) throw new Error("No lottery found");
  //   let hours = Math.floor(lottery?.period / 3600);
  //   let minutes = Math.floor((lottery?.period % 3600) / 60);
  //   let remainingSeconds = lottery?.period % 60;
  //   let newLottery;
  //   let intervalId = setInterval(async () => {
  //     remainingSeconds--;
  //     if (remainingSeconds < 0) {
  //       minutes--;
  //       remainingSeconds = 59;
  //     }
  //     if (minutes < 0) {
  //       clearInterval(intervalId);
  //       return;
  //     }
  //     lottery.period--;
  //     if (lottery.period === 0) {
  //       lottery.period = 180;
  //       newLottery = await evaluate.findByIdAndUpdate(lottery?._id, {
  //         period: lottery.period,
  //         periodNumber: [
  //           ...lottery.periodNumber,
  //           lottery.periodNumber.length + 1,
  //         ],
  //         result: [...lottery.result, getRandomTwo(array)],
  //       });
  //       await newLottery.save();
  //     }
  //     newLottery = await evaluate.findByIdAndUpdate(lottery?._id, {
  //       period: lottery.period,
  //     });
  //     await newLottery.save();
  //     socket.broadcast.emit("receive_time", {
  //       hours,
  //       minutes,
  //       remainingSeconds,
  //       data,
  //     });
  //   }, 1000);
  // });
  // let lottery = await evaluate.findOne({ room: 1 });
  // if (!lottery) throw new Error("No have rooms");
  // if (lottery.length === 0) throw new Error("No lottery found");
  // let hours = Math.floor(lottery?.period / 3600);
  // let minutes = Math.floor((lottery?.period % 3600) / 60);
  // let remainingSeconds = lottery?.period % 60;
  // let newLottery;
  // let intervalId = setInterval(async () => {
  //   remainingSeconds--;
  //   if (remainingSeconds < 0) {
  //     minutes--;
  //     remainingSeconds = 59;
  //   }
  //   if (minutes < 0) {
  //     clearInterval(intervalId);
  //     return;
  //   }
  //   lottery.period--;
  //   if (lottery.period === 0) {
  //     lottery.period = 180;
  //     newLottery = await evaluate.findByIdAndUpdate(lottery?._id, {
  //       period: lottery.period,
  //       periodNumber: [
  //         ...lottery.periodNumber,
  //         lottery.periodNumber.length + 1,
  //       ],
  //       result: [...lottery.result, getRandomTwo(array)],
  //     });
  //     await newLottery.save();
  //     // let users = lottery?.users?.map((user) => {
  //     //   users.push(user?.UserId);
  //     // });
  //     // if (newLottery) {
  //     //   console.log(
  //     //     "3",
  //     //     await newLottery.result[newLottery.result.length - 1].at(-1)
  //     //   );
  //     // }
  //   }
  //   newLottery = await evaluate.findByIdAndUpdate(lottery?._id, {
  //     period: lottery.period,
  //   });
  //   await newLottery.save();
  //   socket.broadcast.emit("receive_time", {
  //     hours,
  //     minutes,
  //     remainingSeconds,
  //   });
  // }, 1000);
});
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
