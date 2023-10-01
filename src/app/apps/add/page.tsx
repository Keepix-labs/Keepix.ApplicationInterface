"use client";

import AppsStore from "@/components/Apps/Store/Store";
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AppsSlug() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <AppsStore />
    </main>
  );
}
