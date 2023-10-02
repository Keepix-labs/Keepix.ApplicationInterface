"use client";

import styles from "./styles.module.scss";
import Icon, { IconTypeKeys } from "../Icon/Icon";
import SidebarApps from "../SidebarApps/SidebarApps";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Action = {
  icon: IconTypeKeys;
  name: string;
  link: string;
  target: "" | "_blank";
};

const actions: Action[] = [
  {
    icon: "add_circle",
    name: "Add Keepix",
    link: "https://keepix.io/setup",
    target: "_blank",
  },
  {
    icon: "monitor_heart",
    name: "System monitor",
    link: "/monitor",
    target: "",
  },
  {
    icon: "add_circle",
    name: "Add Apps",
    link: "/apps/add",
    target: "",
  },
  {
    icon: "tune",
    name: "Preferences",
    link: "/settings",
    target: "",
  },
];

export default function Sidebar() {
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
              <Link
                href={action.link}
                target={action.target}
                className={styles.link}
              >
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
