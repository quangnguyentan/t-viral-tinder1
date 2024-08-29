import { ChevronDown, ChevronLeft, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import danhgia1 from "@/assets/danhgia1.jpg";
import { useEffect, useRef, useState } from "react";
import {
  apiGetLotteryById,
  apiUpdateLottery,
  apiUpdateUserIntoRoom,
} from "@/services/evaluateService";
import { CountDown } from "@/components/custom ui/countDown";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/stores/actions/userAction";
import { useForm } from "react-hook-form";
var connectOptions = {
  transports: ["websocket"],
};

const result = [
  {
    id: 1,
    name: "A",
  },
  {
    id: 2,
    name: "B",
  },
  {
    id: 3,
    name: "C",
  },
  {
    id: 4,
    name: "D",
  },
];
const DetailEvalute = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    onChange,
    formState: { errors },
  } = useForm({
    defaultValues: {
      money: "",
    },
  });
  // const [seconds, setSeconds] = useState(180);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoverActive, setHoverActive] = useState(true);
  const [moneyInput, setMoneyInput] = useState(null);
  const [active, setActive] = useState(false);
  const [lottery, setLottery] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn && token) {
      setTimeout(() => {
        dispatch(getCurrent());
      }, 1000);
    }
  }, [isLoggedIn, token]);
  const handleSelect = (e, name) => {
    e.preventDefault();
    let newSelected = [...selectedItems]; // Assuming you have 'selectedItems' state

    // Check if the clicked element is already selected (includes)
    const isSelected = newSelected.includes(name);

    // Update the selected items based on the click
    if (isSelected) {
      // Remove the clicked element if it's already selected
      newSelected.splice(newSelected.indexOf(name), 1);
    } else {
      // Add the clicked element if it's not already selected (limit to 2?)
      if (newSelected.length < 2) {
        // Limit to 2 selections (optional)
        newSelected.push(name);
      } else {
        // Handle case where user tries to select more than 2 (optional)
        toast.error("Bạn đã chọn tối đa 2 ô");
      }
    }

    // Update state with the new selected items (assuming you have a state)
    newSelected.sort();
    setSelectedItems(newSelected);
  };
  const { roomId, userId } = useParams();
  const apiGetDetailsLottery = async () => {
    const data = await apiGetLotteryById(roomId, userId);
    if (data?.success) setLottery(data?.evaluates);
  };
  const apiUpdateEvaluate = async (values) => {
    // console.log(values?.money);
    localStorage.setItem("pay", values.money);
    setMoneyInput(values?.money);
    const data = await apiUpdateLottery(roomId, userId, {
      money: values?.money,
      result: selectedItems,
    });
    console.log(data);
  };
  useEffect(() => {
    apiGetDetailsLottery();
  }, []);
  const apiUpdateUserRoom = async () => {
    const money = JSON.parse(localStorage.getItem("pay"));
    const data = await apiUpdateUserIntoRoom(roomId, userId, {
      money: money || Number(moneyInput),
    });
    console.log(data);
  };

  const socket = io.connect("http://localhost:8080", connectOptions);
  useEffect(() => {
    socket.on("receive_time", async (data) => {
      const inner = document.getElementById("timer");
      // if (inner.lastChild) {
      //   inner.remove();
      // }
      // if (inner) {
      //   inner.innerHTML = `${data.hours} : ${data.minutes} : ${data.remainingSeconds}`;
      // }
      if (inner) {
        // Clear all existing child elements
        inner.innerHTML = "";
        const timeElement = document.createElement("div");
        timeElement.textContent = `${data.hours} : ${data.minutes} : ${data.remainingSeconds}`;
        inner.appendChild(timeElement);
      }
      // console.log(lottery?.periodNumber.length + 1 === );
      if (
        data.hours === 0 &&
        data.minutes === 0 &&
        data.remainingSeconds === 0
      ) {
        apiUpdateUserRoom();
        location.reload();
        localStorage.removeItem("pay");
      }
    });
  }, [socket]);
  return (
    <div className="md:w-[50%] sm:w-full mx-auto bg-gray-100 h-screen relative">
      <div className="sticky w-full top-0">
        <ChevronLeft
          onClick={() => {
            localStorage.setItem("page", 1);
            navigate("/");
          }}
          className="absolute top-2 z-30 left-4 text-white cursor-pointer"
          size={30}
        />
        <div className="w-full h-[50px] bg-profileColor">
          <span className=" text-xl text-white absolute top-2 left-[40%]">
            Đánh giá {id}
          </span>
        </div>
        {/* <div onClick={apiUpdateUserRoom}>abc</div> */}
      </div>

      <div className="shadow-xl">
        <div className="flex items-center justify-between px-4 pt-4 pb-10">
          <div className="flex gap-4 items-center">
            <div className="w-[60px] h-[60px]">
              <img src={danhgia1} alt="" className="w-full h-full" />
            </div>
            <span className="font-semibold text-xl">
              {lottery?.periodNumber?.length + 1}
            </span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <span className="text-pink-700">Lịch sử đánh giá</span>
            <p hidden id="timeHidden" className=" text-xl text-red-500"></p>
            <p id="timer" className=" text-xl text-red-500"></p>
          </div>
        </div>
        <div className="w-[90%] mx-auto rounded-full h-[2px] bg-borderColor"></div>
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-12 ">
              <span className="flex items-center gap-2">
                Kỳ trước
                <span className="font-semibold">
                  {lottery?.periodNumber?.at(-1)} :
                </span>
              </span>
              <span className="text-blue-500 font-medium">D</span>
              <span className="text-pink-800 font-medium">B</span>
            </div>
            <ChevronDown
              className={`transition cursor-pointer duration-150 ease-in-out ${
                active ? "rotate-180" : ""
              }`}
              onClick={() => setActive(!active)}
            />
          </div>
          {active && (
            <div
              className={`  overflow-y-scroll absolute top-10 w-full h-[220px] bg-white ${
                active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-100%]"
              } transition-all duration-1000 ease-in-out delay-1000`}
            >
              <div className="flex items-center justify-around w-full">
                <span className="text-red-500 font-semibold">Phiên </span>
                <span className="text-red-500 font-semibold">Kết quả</span>
              </div>
              <div className="flex items-center justify-around ">
                <div className="flex flex-col gap-4">
                  {lottery?.periodNumber
                    ?.slice()
                    ?.reverse()
                    ?.map((lot) => (
                      <span className="font-semibold " key={lot}>
                        {lot}
                      </span>
                    ))}
                </div>

                <div className="font-semibold">
                  <div className="flex flex-col gap-4">
                    {lottery?.result
                      ?.slice()
                      ?.reverse()
                      ?.map((lot, index) => (
                        <span
                          className="font-semibold items-center flex gap-6"
                          key={index}
                        >
                          {lot?.map((el) => (
                            <span key={el + index}>{el}</span>
                          ))}
                          {/* lot?.join(" ")?.split(" ").indexOf(el) */}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-8 px-4">
        {result?.map((rs) => (
          <button
            key={rs?.id}
            onClick={(e) => handleSelect(e, rs?.name)}
            className={`w-full h-[160px] rounded-xl ${
              selectedItems?.includes(rs?.name) ? "bg-red-500" : "bg-white"
            }`}
          >
            <div className="w-full flex flex-col items-center justify-center h-full">
              <span
                className={`  ${
                  selectedItems?.includes(rs?.name)
                    ? "text-white font-semibold"
                    : "text-gray-500 font-semibold"
                }`}
              >
                {rs.name}
              </span>
              <span
                className={`  ${
                  selectedItems?.includes(rs?.name)
                    ? "text-white font-semibold"
                    : "text-red-500 font-bold"
                }`}
              >
                1:10
              </span>
            </div>
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(apiUpdateEvaluate)}>
        <div className="w-full h-[70px] bg-white absolute bottom-0">
          <div className="flex items-center py-2 justify-between px-4 relative ">
            {selectedItems?.length > 0 && hoverActive && (
              <div className="absolute bottom-[70px] w-full h-[120px] bg-white border-b-2 left-0">
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex gap-4 items-center">
                    <span>Lựa chọn của bạn</span>
                    {selectedItems?.map((selected, index) => (
                      <span key={index}>{selected}</span>
                    ))}
                  </div>
                  <ChevronDown
                    className={`transition cursor-pointer duration-150 ease-in-out ${
                      hoverActive ? "rotate-180" : ""
                    }`}
                    onClick={() => setHoverActive(!hoverActive)}
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-2">
                  <span>Số tiền đánh giá</span>
                  <input
                    type="number"
                    placeholder="Vui lòng nhập số tiền"
                    className="outline-none text-red-500"
                    {...register("money", { required: true })}
                    aria-invalid={errors.moeny ? "true" : "false"}
                  />
                  {errors.money?.type === "required" &&
                    toast.error("Vui lòng nhập số tiền bạn muốn đặt")}
                </div>
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="flex items-center gap-2">
                    Đặt tổng cộng là
                    <span className="text-red-500 font-bold">
                      {selectedItems?.length}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    Toàn bộ
                    <span className="text-red-500 font-bold">
                      {currentData?.withDraw}
                    </span>
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-12 ">
              <div className="flex flex-col gap-2 items-center ">
                <ShoppingCart
                  size={22}
                  onClick={() => {
                    if (selectedItems.length > 0) setHoverActive(!hoverActive);
                  }}
                />
                <span className="text-gray-500">Lựa chọn</span>
              </div>
              <span className="w-[2px] h-[40px] bg-gray-500"></span>
            </div>
            <div className="flex items-center gap-4">
              <span>
                Số tiền hiện có:{" "}
                <span className="text-red-500">{currentData?.withDraw}</span>
              </span>
              <button className="rounded-2xl bg-profileColor px-4 py-2 ">
                Đánh giá
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailEvalute;
