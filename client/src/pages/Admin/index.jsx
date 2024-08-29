import LeftSideBar from "@/components/LeftSideBar";
import TopBar from "@/components/TopBar";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <div className="flex ">
      <div className="w-1/5">
        <LeftSideBar />
        <TopBar />
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
