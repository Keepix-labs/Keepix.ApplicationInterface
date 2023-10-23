"use client";

import ETHProofOfStakeDashboard from "@/components/Apps/ETHProofOfStake/Dashboard/Dashboard";
import { useParams } from "next/navigation";

export default function AppsSlugView() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeDashboard,
  };

  const params = useParams();

  return (
    <>
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </>
  );
}
