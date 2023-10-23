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
    icon: "ph:plus-square",
    name: "Add Plugins",
    link: "/apps/add",
    target: "",
  },
  {
    icon: "ph:wallet",
    name: "Wallets",
    link: "/wallets",
    target: "",
  },
  {
    icon: "ph:terminal",
    name: "Terminal",
    link: "/terminal",
    target: "",
  },
];

const actions_secondary: Action[] = [
  {
    icon: "ph:activity",
    name: "System monitor",
    link: "/monitor",
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

  return (<div>
    <aside className={styles.sidebar}>
      <Link href={"/"} className={styles.sidebarLogo}>
        <Logo />
        <span>v0.1.0</span>
      </Link>
      <div className={styles.sidebarContent}>
        <SidebarApps />
      </div>
      <nav className={styles.nav} style={{marginBottom:"10px"}}>
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

      <nav className={styles.nav}>
        <ul>
          {actions_secondary.map((action, key) => (
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
    </div>
  );
}
