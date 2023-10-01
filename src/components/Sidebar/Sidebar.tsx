"use client";

import styles from "./styles.module.scss";
import Icon from "../Icon/Icon";
import SidebarApps from "../SidebarApps/SidebarApps";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const actions = [
    {
      icon: "add_circle",
      name: "Add Keepix",
      link: "/keepix/add",
    },
    {
      icon: "monitor_heart",
      name: "System monitor",
      link: "/monitor",
    },
    {
      icon: "add_circle",
      name: "Add Apps",
      link: "/apps/add",
    },
    {
      icon: "tune",
      name: "Preferences",
      link: "/settings",
    },
  ];

  const pathName = usePathname();

  return (
    <div className={styles.main}>
      <div>
        <Link href={"/"} className={styles.logo}>
          logo
        </Link>
        <SidebarApps />
      </div>
      <div className={styles.menu}>
        <ul className={styles.list}>
          {actions.map((action, key) => (
            <li
              data-active={pathName === action.link}
              className={styles.item}
              key={key}
            >
              <Link href={action.link} className={styles.link}>
                <Icon name={action.icon} />
                <span>{action.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
