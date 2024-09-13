import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "@/assets/user.jpeg";
const Information = () => {
  const { currentData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrent());
  }, []);
  return (
    <>
      <div className="h-screen">
        <div className="relative w-full mx-auto">
          <div className="sticky w-full top-0">
            <div className="w-full h-[50px] bg-profileColor">
              <ChevronLeft
                onClick={() => {
                  navigate(window.history.back());
                }}
                className="absolute top-2 z-30 left-4 text-white cursor-pointer"
                size={30}
              />
              <span className=" text-xl text-white absolute top-2 left-[40%]">
                Thông tin cá nhân
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            <div
              className="flex justify-between px-4 py-2"
              onClick={() => navigate(`/setName/${currentData?._id}`)}
            >
              <span>Họ tên thật</span>
              <div className="flex items-center gap-2 ">
                <span>
                  {currentData?.fullName
                    ? currentData?.fullName
                    : currentData?.username}
                </span>
                <ChevronRight />
              </div>
            </div>
            <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            <div
              className="flex justify-between px-4 py-2"
              onClick={() => navigate(`/setGender/${currentData?._id}`)}
            >
              <span>Giới tính</span>
              <div className="flex items-center gap-2 ">
                <span>{currentData?.gender}</span>
                <ChevronRight />
              </div>
            </div>
            <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            <div
              className="flex justify-between px-4 py-2"
              onClick={() => navigate(`/setBank/${currentData?._id}`)}
            >
              <span>Liên kết ngân hàng</span>
              <div className="flex items-center gap-2 ">
                <span>
                  {currentData?.creditCartOfBank &&
                  currentData?.nameOfBank &&
                  currentData?.nameOfUser
                    ? "Đã liên kết"
                    : "Chưa liên kết"}
                </span>
                <ChevronRight />
              </div>
            </div>
            <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
