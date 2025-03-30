import { NavBarProps } from "@/interfaces";
import { NavBarDataType } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavBar = (props: NavBarProps) => {
  const { active } = props;
  const activeClass = "border-b-4 border-gray-700";

  const links: NavBarDataType[] = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "About", path: "/about" },
    { id: 3, label: "Contact", path: "/contact" },
    { id: 4, label: "Students", path: "/students" },
    { id: 5, label: "Courses", path: "/courses" },
  ];

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={active === link.label ? activeClass : ""}
          >
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
