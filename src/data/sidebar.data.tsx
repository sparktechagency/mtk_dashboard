import { LayoutDashboard } from "lucide-react";
import {
    SettingOutlined
  } from '@ant-design/icons';
import { MdCategory, MdContactPhone, MdSubscriptions } from "react-icons/md";
import { PiResize, PiStudentBold } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosColorFilter } from "react-icons/io";
export const menuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admins", label: "Admins", icon: GrUserAdmin },
  { path: "/users", label: "Users", icon: PiStudentBold },
  { path: "/category", label: "Category", icon: MdCategory },
  { path: "/colors", label: "Colors", icon: IoIosColorFilter },
  { path: "/sizes", label: "Sizes", icon: PiResize },
  { path: "/contacts", label: "Contact  List", icon: MdContactPhone },
  {
    path: "",
    label: "Help & FAQ",
    icon: MdSubscriptions,
    hasArrow: true,
    children: [
      { path: "/help", label: "Help & Support" },
      { path: "/faqs", label: "FAQS" },
    ],
  },
  {
    icon: SettingOutlined,
    label: "Settings",
    hasArrow: true,
    children: [
      { path: "/profile", label: "Profile" },
      { path: "/change-password", label: "Change Password" },
      { path: "/about-us", label: "About Us" },
      { path: "/terms-condition", label: "Terms & Conditions" },
      { path: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

