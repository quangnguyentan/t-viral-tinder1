import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apichangePassword } from "@/services/authService";
import { apiUpdatedUser } from "@/services/userService";
import { getCurrent } from "@/stores/actions/userAction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const updatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const { register, handleSubmit, watch, setValue, getValues, onChange } =
    useForm({
      password: "",
      newPassword: "",
      rePassword: "",
    });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (values) => {
    try {
      setIsLoadding(true);
      // const url = initialData
      //   ? `/api/collections/${initialData?._id}`
      //   : "/api/collections/new";

      const res = await apichangePassword(id, {
        password: values?.password,
        rePassword: values?.rePassword,
        newPassword: values?.newPassword,
      });
      console.log(res);
      if (res.success) {
        setIsLoadding(false);
        toast.success(`Thay đổi mật khẩu thành công `);
        // window.location.href = "/collections";
        navigate("/information");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log("[collections_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <>
      <div className="h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  Đổi mật khẩu
                </span>
                <Button
                  type="submit"
                  className=" text-white text-lg absolute top-1 right-0"
                >
                  Lưu
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span>Mật khẩu cũ</span>
                <div className="">
                  <input
                    {...register("password")}
                    placeholder="Mật khẩu cũ"
                    onKeyDown={handleKeyPress}
                    className="outline-none border-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span>Mật khẩu mới</span>
                <div className="">
                  <input
                    {...register("newPassword")}
                    placeholder="Mật khẩu mới"
                    onKeyDown={handleKeyPress}
                    className="outline-none border-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-8 px-4 py-2">
                <span>Nhập lại mật khẩu mới</span>
                <div className="">
                  <input
                    {...register("rePassword")}
                    placeholder="Nhập lại mật khẩu mới"
                    onKeyDown={handleKeyPress}
                    className="outline-none border-none"
                  />
                </div>
              </div>

              <div className="w-[90%] mx-auto h-[0.5px] bg-[#ebedf0]"></div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default updatePassword;
