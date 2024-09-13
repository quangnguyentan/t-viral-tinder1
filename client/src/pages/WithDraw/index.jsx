import { apiUpdatedWithDrawAndDeposit } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const WithDraw = () => {
  const [active, setActive] = useState(false);
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      defaultValues: {
        money: "",
      },
    });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const updateWithDrawAndDeposit = async (values) => {
    const data = await apiUpdatedWithDrawAndDeposit(id, {
      draw: values?.money,
    });
    if (data.success) {
      toast.success(
        `Bạn đã rút ${values?.money}! Vui lòng đợi quản trị viên kiểm duyệt`
      );
    } else {
      toast.error(`${data?.message}`);
    }
    setTimeout(() => {
      location.reload();
    }, 3000);
  };

  useEffect(() => {
    dispatch(getCurrent());
  }, []);
  return (
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
            <span className=" text-xl text-white absolute top-2 left-[35%]">
              Rút điểm
            </span>
            <span className=" text-lg text-white absolute top-2 right-[20px]">
              Lịch sử rút
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(updateWithDrawAndDeposit)}>
          <div className="flex flex-col gap-4">
            <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            <div className="flex  px-4 py-2">
              <span className="text-red-500 text-lg font-semibold">
                {currentData?.nameOfUser?.slice(0, 6) + " " + "(******)"}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-4 px-4 py-2">
              <span>Số tiền rút</span>
              <input
                {...register("money")}
                type="number"
                placeholder="Vui lòng nhập số điểm"
                className="outline-none border-[1px] border-gray-500 w-full h-12 px-2"
              />
            </div>
            <div className="flex items-center justify-between gap-8 px-4 py-2">
              <span>
                Số tiền
                <span className="text-red-500 font-semibold">
                  {currentData?.withDraw}
                </span>
              </span>
              <span
                className="flex items-center gap-2"
                onClick={() => setActive(!active)}
              >
                <Info className="text-gray-500" /> <span>Lưu ý</span>
              </span>
              {active && (
                <div className="absolute bottom-0 right-0">
                  <div className="w-2/3 h-32 bg-white flex flex-col justify-center gap-4 mx-auto px-4">
                    <span>1. Giới hạn: tối thiểu 100 ，tối đa 20000</span>
                    <span>2. Số lần Rút điểm: tối đa 50 / ngày</span>
                    <span>
                      3. Thời gian: Thông thường, thời gian đến là khoảng 5 phút
                      và thời gian nhanh nhất là 2 phút
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="px-8 py-12">
              <button
                type="submit"
                className="flex items-center w-full  bg-profileColor h-12 justify-center text-white rounded-full"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithDraw;
