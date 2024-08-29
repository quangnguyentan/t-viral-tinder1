import { apiUpdatedUser } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const updateBank = () => {
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      defaultValues: {
        nameOfUser: "",
        creditCartOfBank: "",
        nameOfBank: "",
      },
    });
  const params = useParams();
  const { id } = params;
  const { currentData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrent());
  }, []);
  const updateUser = async (values) => {
    try {
      const data = await apiUpdatedUser(id, {
        creditCartOfBank: values?.creditCartOfBank,
        nameOfUser: values?.nameOfUser,
        nameOfBank: values?.nameOfBank,
      });
      console.log(data);
      if (data.success) {
        toast.success(`Liên kết ngân hàng thành công `);
        // window.location.href = "/collections";
        navigate("/");
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      // toast.error("Something went wrong! Please try again.");
    }
  };
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
          {currentData?.nameOfBank &&
          currentData.nameOfUser &&
          currentData?.creditCartOfBank ? (
            <div className="flex flex-col gap-4">
              <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
              <div className="flex  px-4 py-2">
                <span className="text-red-500">Đã liên kết ngân hàng</span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span>Chủ tài khoản</span>
                <span>{currentData?.nameOfUser}</span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span>Số tài khoản</span>
                <span>{currentData?.creditCartOfBank}</span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span>Tên ngân hàng</span>
                <span>{currentData?.nameOfBank}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(updateUser)}>
              <div className="flex flex-col gap-4">
                <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
                <div className="flex  px-4 py-2">
                  <span>Vui lòng liên kết ngân hàng</span>
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span>Chủ tài khoản</span>
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="Chủ tài khoản"
                    {...register("nameOfUser")}
                  />
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span>Số tài khoản</span>
                  <input
                    type="number"
                    className="outline-none"
                    placeholder="Số tài khoản"
                    {...register("creditCartOfBank")}
                  />
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span>Tên ngân hàng</span>
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="Tên ngân hàng"
                    {...register("nameOfBank")}
                  />
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <span className="text-red-500 font-semibold">
                    Để đảm bảo an toàn cho tài khoản của bạn, vui lòng liên kết
                    họ tên thật của bạn và đặt mật khẩu rút. Nếu tên của bạn
                    không khớp với tên tài khoản, bạn sẽ không thể rút.
                  </span>
                </div>
                <div className="flex items-center gap-8 px-4 py-2">
                  <button
                    type="submit"
                    className="bg-profileColor w-full rounded-xl h-12 text-white"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default updateBank;
