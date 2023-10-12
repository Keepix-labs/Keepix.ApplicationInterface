"use client";

import ETHProofOfStakeAmount from "@/components/Apps/ETHProofOfStake/Amount/Amount";
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";

export default function AppsSlugAmountView() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeAmount,
  };

  const params = useParams();

  return (
    <>
      <Sidebar />
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </>
  );
}
