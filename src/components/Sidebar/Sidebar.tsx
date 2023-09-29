import styles from "./sidebar.module.scss";
import Icon from "../Icon/Icon";
import SidebarApps from "../SidebarApps/SidebarApps";

export default function Sidebar() {
  const actions = [
    {
      icon: "add_circle",
      name: "Add Keepix",
      action: undefined,
    },
    {
      icon: "monitor_heart",
      name: "System monitor",
      action: undefined,
    },
    {
      icon: "add_circle",
      name: "Add Apps",
      action: undefined,
    },
    {
      icon: "tune",
      name: "Preferences",
      action: undefined,
    },
  ];

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.logo}>logo</div>
        <SidebarApps />
      </div>
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
