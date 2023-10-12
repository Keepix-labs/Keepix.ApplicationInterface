"use client";

import styles from "./styles.module.scss";
import SidebarApps from "../SidebarApps/SidebarApps";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from '@iconify-icon/react';

type Action = {
  icon: string;
  name: string;
  link: string;
  target: "" | "_blank";
};

const actions: Action[] = [
  {
    icon: "ph:plus-circle",
    name: "Add Keepix",
    link: "https://keepix.io/setup",
    target: "_blank",
  },
  {
    icon: "ph:activity",
    name: "System monitor",
    link: "/monitor",
    target: "",
  },
  {
    icon: "ph:plus-square",
    name: "Add Apps",
    link: "/apps/add",
    target: "",
  },
  {
    icon: "ph:sliders-horizontal",
    name: "Preferences",
    link: "/settings",
    target: "",
  },
];

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Link href={"/"} className={styles.sidebarLogo}>
        <Logo />
        <span>v0.1.0</span>
      </Link>
      <div className={styles.sidebarContent}>
        <SidebarApps />
      </div>
      <nav className={styles.nav}>
        <ul>
          {actions.map((action, key) => (
            <li
              data-active={pathName === action.link}
              key={key}
            >
              <Link
                href={action.link}
                target={action.target}
                className={styles.link}
              >
                <Icon icon={action.icon} />
                <span>{action.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
