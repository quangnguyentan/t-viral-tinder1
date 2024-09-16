import danhgia1 from "@/assets/danhgia1.jpg";
import danhgia2 from "@/assets/danhgia2.jpg";
import danhgia3 from "@/assets/danhgia3.jpg";
import danhgia4 from "@/assets/danhgia4.jpeg";
import danhgia5 from "@/assets/danhgia5.jpg";
import danhgia6 from "@/assets/danhgia6.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Lottery from "../Admin/Lottery";
import { apiGetAllLottery } from "@/services/evaluateService";

const Evalute = ({ currentData }) => {
  const [active, setActive] = useState(0);
  const [lottery, setLottery] = useState([]);
  const [key, setKey] = useState(1);
  const apiGetLottery = async () => {
    const data = await apiGetAllLottery();
    if (data?.success) setLottery(data?.lotteries);
  };
  useEffect(() => {
    apiGetLottery();
  }, []);
  return (
    <div className="w-full h-screen">
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
            {lottery?.map((lot, index) => (
              <Link
                key={lot?._id}
                to={`/lottery/${index + 1}/${currentData?._id}/${lot?.period}`}
                onClick={(e) => {
                  setTimeout(() => {
                    e.preventDefault();
                    e.stopPropagation();
                  }, 100);
                  setKey(1);
                  // joinRoom(1);
                }}
              >
                <div className="w-[100%] bg-white cursor-pointer  rounded-2xl h-[140px] flex flex-col items-center ">
                  <img
                    className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                    src={`https://sv.sexyloveeu.com/images/${lot?.image}`}
                    alt="evalute"
                  />
                  <span className="">Đánh giá {index + 1} </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {active === 1 && (
          <Link
            to={`/lottery/${1}/${currentData?._id}/${lottery[0]?.period}`}
            onClick={(e) => {
              setTimeout(() => {
                e.preventDefault();
                e.stopPropagation();
              }, 100);
              setKey(1);
              // joinRoom(1);
            }}
          >
            <div className="w-[100%] bg-white cursor-pointer rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                src={danhgia1}
                alt="evalute"
              />
              <span className="">Đánh giá 1 </span>
            </div>
          </Link>
        )}
        {active === 2 && (
          <Link
            to={`/lottery/${2}/${currentData?._id}/${lottery[1]?.period}`}
            onClick={(e) => {
              setTimeout(() => {
                e.preventDefault();
                e.stopPropagation();
              }, 100);
              setKey(1);
              // joinRoom(1);
            }}
          >
            <div className="w-full bg-white cursor-pointer rounded-2xl h-[140px] flex flex-col items-center">
              <img
                className="w-full h-[70%] object-contain rounded-2xl px-4 py-2  "
                src={danhgia2}
                alt="evalute"
              />
              <span className="">Đánh giá 2 </span>
            </div>
          </Link>
        )}
        {active === 3 && (
          <Link
            to={`/lottery/${3}/${currentData?._id}/${lottery[2]?.period}`}
            onClick={(e) => {
              setTimeout(() => {
                e.preventDefault();
                e.stopPropagation();
              }, 100);
              setKey(1);
              // joinRoom(1);
            }}
          >
            <div className="w-[120px] bg-white cursor-pointer rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-[120px] h-[70%] object-contain rounded-2xl px-4 py-2  "
                src={danhgia3}
                alt="evalute"
              />
              <span className="">Đánh giá 3 </span>
            </div>
          </Link>
        )}
        {active === 4 && (
          <Link
            to={`/lottery/${4}/${currentData?._id}/${lottery[3]?.period}`}
            onClick={(e) => {
              setTimeout(() => {
                e.preventDefault();
                e.stopPropagation();
              }, 100);
              setKey(1);
              // joinRoom(1);
            }}
          >
            <div className="w-[120px] bg-white cursor-pointer rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-[110px] h-[70%] object-fill rounded-2xl px-4 py-2  "
                src={danhgia4}
                alt="evalute"
              />
              <span className="">Đánh giá 4 </span>
            </div>
          </Link>
        )}
        {active === 5 && (
          <Link
            to={`/lottery/${5}/${currentData?._id}/${lottery[4]?.period}`}
            onClick={(e) => {
              setTimeout(() => {
                e.preventDefault();
                e.stopPropagation();
              }, 100);
              setKey(1);
              // joinRoom(1);
            }}
          >
            <div className="w-[120px]l bg-white cursor-pointer rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-[120px] h-[70%] object-contain rounded-2xl px-4 py-2  "
                src={danhgia5}
                alt="evalute"
              />
              <span className="">Đánh giá 5</span>
            </div>
          </Link>
        )}
        {active === 6 && (
          <Link
            to={`/lottery/${6}/${currentData?._id}/${lottery[5]?.period}`}
            onClick={(e) => {
              setTimeout(() => {
                e.preventDefault();
                e.stopPropagation();
              }, 100);
              setKey(1);
              // joinRoom(1);
            }}
          >
            <div className="w-[120px] bg-white cursor-pointer rounded-2xl h-[140px] flex flex-col items-center ">
              <img
                className="w-[120px] h-[70%] object-contain rounded-2xl px-4 py-2  "
                src={danhgia6}
                alt="evalute"
              />
              <span className="">Đánh giá 6 </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Evalute;
