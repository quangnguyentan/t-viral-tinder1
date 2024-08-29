import danhgia1 from "@/assets/danhgia1.jpg";
import danhgia2 from "@/assets/danhgia2.jpg";
import danhgia3 from "@/assets/danhgia3.jpg";
import danhgia4 from "@/assets/danhgia4.jpeg";
import danhgia5 from "@/assets/danhgia5.jpg";
import danhgia6 from "@/assets/danhgia6.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

var connectOptions = {
  transports: ["websocket"],
};
const Evalute = ({ currentData }) => {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(1);
  const socket = io.connect("http://localhost:8080", connectOptions);

  const joinRoom = (key) => {
    socket.emit("room", { room: key, userId: currentData?._id });
  };
  return (
    <div className="w-full h-screen  ">
      <div className="sticky w-full top-0">
        <div className="w-full h-[50px] bg-profileColor">
          <span className=" text-xl text-white absolute top-2 left-[40%]">
            Sảnh đánh giá
          </span>
        </div>
      </div>
      <div className="w-full flex bg-gray-100">
        <div className="flex flex-col w-[30%]">
          <div
            className={`w-full h-[62px] ${
              active === 0 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(0)}
          >
            <span>Tất cả</span>
          </div>
          <div
            className={`w-full h-[62px] ${
              active === 1 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(1)}
          >
            <span>Đánh giá 1</span>
          </div>
          <div
            className={`w-full h-[62px] ${
              active === 2 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(2)}
          >
            <span>Đánh giá 2</span>
          </div>
          <div
            className={`w-full h-[62px] ${
              active === 3 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(3)}
          >
            <span>Đánh giá 3</span>
          </div>
          <div
            className={`w-full h-[62px] ${
              active === 4 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(4)}
          >
            <span>Đánh giá 4</span>
          </div>
          <div
            className={`w-full h-[62px] ${
              active === 5 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(5)}
          >
            <span>Đánh giá 5</span>
          </div>
          <div
            className={`w-full h-[62px] ${
              active === 6 ? "bg-white text-blue-500" : ""
            } cursor-pointer flex items-center justify-center`}
            onClick={() => setActive(6)}
          >
            <span>Đánh giá 6</span>
          </div>
        </div>
        {active === 0 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <Link
              to={`/lottery/${key}/${currentData?._id}`}
              onClick={(e) => {
                setKey(1);
                joinRoom(1);
              }}
            >
              <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center ">
                <img
                  className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                  src={danhgia1}
                  alt="evalute"
                />
                <span className="">Đánh giá 1 </span>
              </div>
            </Link>
            <Link
              to={`/lottery/${key + 1}/${currentData?._id}`}
              onClick={(e) => {
                setKey(2);
                joinRoom(2);
              }}
            >
              <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center">
                <img
                  className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                  src={danhgia2}
                  alt="evalute"
                />
                <span className="">Đánh giá 2 </span>
              </div>
            </Link>
            <Link
              to={`/lottery/${key + 2}/${currentData?._id}`}
              onClick={(e) => {
                setKey(3);
                joinRoom(3);
              }}
            >
              <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center ">
                <img
                  className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                  src={danhgia3}
                  alt="evalute"
                />
                <span className="">Đánh giá 3 </span>
              </div>
            </Link>
            <Link
              to={`/lottery/${key + 3}/${currentData?._id}`}
              onClick={(e) => {
                setKey(4);
                joinRoom(4);
              }}
            >
              <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center ">
                <img
                  className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                  src={danhgia4}
                  alt="evalute"
                />
                <span className="">Đánh giá 4 </span>
              </div>
            </Link>
            <Link
              to={`/lottery/${key + 4}/${currentData?._id}`}
              onClick={(e) => {
                setKey(5);
                joinRoom(5);
              }}
            >
              <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px]  flex flex-col items-center">
                <img
                  className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                  src={danhgia5}
                  alt="evalute"
                />
                <span className="">Đánh giá 5 </span>
              </div>
            </Link>
            <Link
              to={`/lottery/${key + 5}/${currentData?._id}`}
              onClick={(e) => {
                setKey(6);
                joinRoom(6);
              }}
            >
              <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px]  flex flex-col items-center">
                <img
                  className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                  src={danhgia6}
                  alt="evalute"
                />
                <span className="">Đánh giá 6 </span>
              </div>
            </Link>
          </div>
        )}
        {active === 1 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <div className="w-[100%] bg-white cursor-pointer rounded-2xl h-[140px] ">
              <img
                className="w-full h-full object-contain rounded-2xl px-4  "
                src={danhgia1}
                alt="evalute"
              />
            </div>
          </div>
        )}
        {active === 2 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <div className="w-full bg-white cursor-pointer rounded-2xl h-[140px]">
              <img
                className="w-full h-full object-contain rounded-2xl px-4  "
                src={danhgia2}
                alt="evalute"
              />
            </div>
          </div>
        )}
        {active === 3 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <div className="w-full bg-white cursor-pointer rounded-2xl h-[140px] ">
              <img
                className="w-full h-full object-contain rounded-2xl px-4  "
                src={danhgia3}
                alt="evalute"
              />
            </div>
          </div>
        )}
        {active === 4 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <div className="w-full bg-white cursor-pointer rounded-2xl h-[140px] ">
              <img
                className="w-full h-full object-contain rounded-2xl px-4  "
                src={danhgia4}
                alt="evalute"
              />
            </div>
          </div>
        )}
        {active === 5 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <div className="w-full bg-white cursor-pointer rounded-2xl h-[140px] ">
              <img
                className="w-full h-full object-contain rounded-2xl px-4  "
                src={danhgia5}
                alt="evalute"
              />
            </div>
          </div>
        )}
        {active === 6 && (
          <div className="w-[70%] grid grid-cols-2 gap-2 px-4 pb-20 pt-4 ">
            <div className="w-full bg-white cursor-pointer rounded-2xl h-[140px] ">
              <img
                className="w-full h-full object-contain rounded-2xl px-4  "
                src={danhgia6}
                alt="evalute"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evalute;
