import {
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { PiGitBranchThin, PiStudentThin } from "react-icons/pi";
import { RxHome } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { type NavShape } from "../utils/navigationItems";
import styles from "./Aside.module.css";

interface Props {
  nav: NavShape;
}

function EachNav({ nav }: Props) {
  const iconMap: { [key: string]: React.ReactNode } = {
    home: <RxHome />,
    branch: <PiGitBranchThin />,
    attendance: <HiOutlineCalendarDays />,
    student: <PiStudentThin />,
    teacher: <HiOutlineUsers />,
    class: <HiOutlineHomeModern />,
  };

  return (
    <nav>
      <NavLink
        to={nav.href}
        className={({ isActive }) => {
          return isActive ? styles.activeNav : "";
        }}
      >
        <span>{iconMap[nav.icon]}</span>
        <p>{nav.label}</p>
      </NavLink>
    </nav>
  );
}

export default EachNav;
