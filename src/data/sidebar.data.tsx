import { LayoutDashboard, UserCheck} from "lucide-react";
import {
    SettingOutlined
  } from '@ant-design/icons';
import { MdCategory, MdContactPhone, MdSubscriptions } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
export const menuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admins", label: "Admins", icon: GrUserAdmin },
  { path: "/candidates", label: "Candidates", icon: PiStudentBold },
  { path: "/employers", label: "Employers", icon: UserCheck },
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
  { path: "/category", label: "Category", icon: MdCategory },
  { path: "/contacts", label: "Contact", icon: MdContactPhone },
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

