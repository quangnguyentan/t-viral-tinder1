import { navLinks } from "@/lib/constant";
import { Link } from "react-router-dom";
import logo from "@/assets/auth.png";

const LeftSideBar = () => {
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <img src={logo} alt="logo" width={120} height={70} />
      <div className="flex flex-col gap-12">
        {navLinks?.map((link) => (
          <Link
            to={link?.url}
            key={link?.label}
            className={`flex gap-4 text-body-medium ${
              location.pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {/* {link?.icon} */}
            <p>{link?.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
