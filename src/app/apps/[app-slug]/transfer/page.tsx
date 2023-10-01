"use client";

import ETHProofOfStakeTransfer from "@/components/Apps/ETHProofOfStake/Transfer/Transfer";
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";

export default function AppsSlug() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeTransfer,
  };

  const params = useParams();

  return (
    <main className={styles.main}>
      <Sidebar />
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </main>
  );
}
