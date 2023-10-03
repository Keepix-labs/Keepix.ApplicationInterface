"use client";

import ETHProofOfStakeDashboard from "@/components/Apps/ETHProofOfStake/Dashboard/Dashboard";
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";

export default function AppsSlugView() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeDashboard,
  };

  const params = useParams();

  return (
    <main className={styles.main}>
      <Sidebar />
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </main>
  );
}
