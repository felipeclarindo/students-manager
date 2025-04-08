import { NavBarProps } from "@/interfaces";
import { NavBarDataType } from "@/types";
import Link from "next/link";

export const NavBar = (props: NavBarProps) => {
  const { active } = props;
  const activeClass = "border-b-4 border-gray-700";

  const links: NavBarDataType[] = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Dashboard", path: "/dashboard" },
    { id: 3, label: "Manager", path: "/manager" },
  ];

  return (
    <nav className="flex justify-between items-center bg-gray-200 p-6">
      <h1 className="text-2xl font-bold">
        Students <br /> Manager
      </h1>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className={active === link.label ? activeClass : ""}
              href={link.path}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <img
        className="size-12 rounded-full"
        src="http://github.com/felipeclarindo.png"
        alt="GitHub Avatar"
      />
    </nav>
  );
};
