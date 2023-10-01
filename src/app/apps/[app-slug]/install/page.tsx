"use client";

import ETHProofOfStakeInstall from "@/components/Apps/ETHProofOfStake/Install/Install";
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";

export default function AppsSlug() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeInstall,
  };

  const params = useParams();

  return (
    <main className={styles.main}>
      <Sidebar />
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </main>
  );
}
