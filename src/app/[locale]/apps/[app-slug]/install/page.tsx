"use client";

import ETHProofOfStakeInstall from "@/components/Apps/ETHProofOfStake/Install/Install";
import { useParams } from "next/navigation";

export default function AppsSlugInstallView() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeInstall,
  };

  const params = useParams();

  return (
    <>
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </>
  );
}
