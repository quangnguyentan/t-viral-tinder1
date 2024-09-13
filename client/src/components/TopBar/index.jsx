import { navLinks } from "@/lib/constant";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/auth.png";
const TopBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <img src={logo} alt="logo" width={150} height={70} />
      <div className="flex gap-8 max-md:hidden">
        {navLinks?.map((link) => (
          <Link
            href={link?.url}
            key={link?.label}
            className={`flex gap-4 text-body-medium ${
              location.pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link?.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 text-body-medium items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        />
        {dropDownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks?.map((link) => (
              <Link
                href={link?.url}
                key={link?.label}
                className="flex gap-4 text-body-medium"
              >
                {/* {link?.icon} */}
                <p>{link?.label}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
