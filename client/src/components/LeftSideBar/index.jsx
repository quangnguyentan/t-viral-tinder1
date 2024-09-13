import { navLinks } from "@/lib/constant";
import { Link } from "react-router-dom";
import logo from "@/assets/auth.png";
import { logout } from "@/stores/actions/authAction";
import { useDispatch } from "react-redux";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-fit left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden w-full">
      <Link to="/">
        <img src={logo} alt="logo" width={120} height={70} />
      </Link>
      <div className="flex flex-col gap-12 ">
        {navLinks?.map((link) => (
          <Link
            to={link?.url}
            key={link?.label}
            className={`flex gap-4 px-4 py-2 w-full  items-center justify-start  ${"hover:text-white hover:bg-profileColor rounded-xl  "}`}
          >
            {/* {link?.icon} */}
            <p className="text-lg font-semibold">{link?.label}</p>
          </Link>
        ))}
        <div className="">
          <button
            className="flex items-center w-full text-lg font-semibold  bg-profileColor px-4 py-2 justify-start text-white rounded-xl"
            onClick={() => dispatch(logout())}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
