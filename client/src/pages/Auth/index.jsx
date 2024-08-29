import bg_login from "@/assets/bg-login.webp";
import auth from "@/assets/auth.png";
import { ChevronLeft, Eye, EyeOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLoginSuccess, apiRegister } from "@/services/authService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccessAction } from "@/stores/actions/authAction";

const Auth = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [registerPage, setRegisterPage] = useState(true);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    if (!registerPage) {
      try {
        const data = await apiRegister(values);
        if (data.success) {
          toast.success("Created Successfully");
          setRegisterPage(!registerPage);
          resetForm();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const data = await apiLoginSuccess(values);
      if (data.success === 0) {
        dispatch(loginSuccessAction(values));
        resetForm();
        setTimeout(() => {
          navigate("/");
          localStorage.setItem("page", 4);
        }, 1000);
        setTimeout(() => {
          toast.success("Login successful");
        }, 2000);
        // if (data?.accessToken) {
        //   navigate("/admin/collection");
        // } else {
        //   navigate("/");
        // }
      } else {
        toast.error(data.success);
      }
    }
  };
  const handleClick = () => resetField("username");
  const resetForm = () => {
    resetField("password");
    resetField("username");
  };
  useEffect(() => {
    if (isLoggedIn && token) navigate("/");
  }, []);
  return (
    <>
      {registerPage ? (
        <div className="relative w-full mx-auto lg:w-[50%] bg-blue-500 h-screen ">
          <div className="absolute w-full h-full">
            <img
              src={bg_login}
              alt="background login"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronLeft
            onClick={() => {
              navigator("/");
              resetForm();
            }}
            className="absolute top-0 z-30 left-4 text-white cursor-pointer"
            size={40}
          />
          <div className="bg-customColor w-full h-screen z-10 absolute">
            <div className="absolute top-12 left-[25%] w-[220px] h-[168px]">
              <img src={auth} alt="logo auth" />
            </div>
            <div className="absolute bottom-2 flex flex-col gap-10 items-center w-full ">
              <h3 className="text-4xl font-bold text-white">Đăng Nhập</h3>
              <div className="w-full px-12 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      placeholder="Tên đăng nhập"
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] placeholder:text-xl placeholder:text-center"
                      {...register("username", { required: true })}
                    />
                    {watch("username").length > 0 && (
                      <X
                        onClick={handleClick}
                        className="absolute top-6 text-gray-400 right-4"
                      />
                    )}
                  </div>
                  {errors.username && (
                    <span className="text-red-600 text-xl font-bold">
                      This field is required
                    </span>
                  )}
                  {/* include validation with required or other standard HTML validation rules */}
                  <div className="relative">
                    <input
                      type={hiddenPassword ? "password" : "text"}
                      placeholder="Mật khẩu"
                      {...register("password", { required: true })}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] placeholder:text-xl placeholder:text-center"
                    />
                    {hiddenPassword ? (
                      <Eye
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.password && (
                    <span className="text-red-600 text-xl font-bold">
                      This field is required
                    </span>
                  )}
                  <div className="w-full flex justify-end px-8">
                    <span className="font-semibold cursor-pointer text-lg text-white  ">
                      Quên mật khẩu?
                    </span>
                  </div>
                  <div className="w-full flex justify-center px-8">
                    <span
                      onClick={() => {
                        setRegisterPage(!registerPage);
                        resetForm();
                      }}
                      className="text-lg cursor-pointer font-semibold text-white "
                    >
                      Đăng kí tài khoản
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#775fd9] sm:text-xl text-center w-full rounded-full border-none outline-none h-[50px] placeholder:text-xl text-white  font-bold placeholder:text-center"
                  >
                    Đăng nhập
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full mx-auto  lg:w-[50%] bg-blue-500 h-screen m-auto ">
          <div className="absolute w-full h-full">
            <img
              src={bg_login}
              alt="background login"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronLeft
            onClick={() => {
              setRegisterPage(!registerPage);
              resetForm();
            }}
            className="absolute z-30 top-0 left-4 text-white cursor-pointer"
            size={40}
          />
          <div className="bg-customColor w-full h-screen z-10 absolute">
            <div className="absolute top-12 left-[35%] w-[220px] h-[168px]">
              <img src={auth} alt="logo auth" />
            </div>
            <div className="absolute bottom-2 flex flex-col gap-10 items-center w-full ">
              <h3 className="text-4xl font-bold text-white">Đăng Ký</h3>
              <div className="w-full px-12 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      placeholder="Tên đăng ký"
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] placeholder:text-xl placeholder:text-center"
                      {...register("username", { required: true })}
                    />
                    <X
                      onClick={handleClick}
                      className="absolute top-6 text-gray-400 right-4"
                    />
                  </div>
                  {errors.username && (
                    <span className="text-red-600 text-xl font-bold">
                      This field is required
                    </span>
                  )}
                  {/* include validation with required or other standard HTML validation rules */}
                  <div className="relative">
                    <input
                      type={hiddenPassword ? "password" : "text"}
                      placeholder="Mật khẩu"
                      {...register("password", { required: true })}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] placeholder:text-xl placeholder:text-center"
                    />
                    {hiddenPassword ? (
                      <Eye
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.password && (
                    <span className="text-red-600 text-xl font-bold">
                      This field is required
                    </span>
                  )}
                  <button
                    type="submit"
                    className="bg-[#775fd9] sm:text-xl text-center w-full rounded-full border-none outline-none h-[50px] placeholder:text-xl text-white  font-bold placeholder:text-center"
                  >
                    Đăng Ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
