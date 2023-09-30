import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import AppsHome from "@/components/Apps/Home/Home";

export default function Home() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <AppsHome />
    </main>
  );
}
