"use client";

import Image from "next/image";
import styles from "./sidebar.module.scss";
import localFont from "next/font/local";
import Icon from "./Icon/Icon";

export default function Sidebar() {
  const actions = [
    {
      icon: "add_circle",
      name: "Add Keepix",
      action: () => {},
    },
    {
      icon: "monitor_heart",
      name: "System monitor",
      action: () => {},
    },
    {
      icon: "add_circle",
      name: "Add Apps",
      action: () => {},
    },
    {
      icon: "tune",
      name: "Preferences",
      action: () => {},
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.logo}>logo</div>
      <div className={styles.menu}>
        <ul>
          {actions.map((action, key) => (
            <li onClick={action.action} key={key}>
              <Icon name={action.icon} />
              <span>{action.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
