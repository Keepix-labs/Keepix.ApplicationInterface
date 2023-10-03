import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Settings from "@/components/Settings/Settings";

export default function MonitorView() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <Settings />
    </main>
  );
}