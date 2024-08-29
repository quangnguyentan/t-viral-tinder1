import { logout } from "@/stores/actions/authAction";
import { useDispatch } from "react-redux";

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  return (
    <div className="px-4 py-12">
      <button
        className="  flex items-center w-[80px]  bg-profileColor h-8 justify-center text-white rounded-xl"
        onClick={() => dispatch(logout())}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default AdminDashBoard;
