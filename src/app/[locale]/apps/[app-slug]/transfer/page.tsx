"use client";

import ETHProofOfStakeTransfer from "@/components/Apps/ETHProofOfStake/Transfer/Transfer";
import { useParams } from "next/navigation";

export default function AppsSlugTransferView() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeTransfer,
  };

  const params = useParams();

  return (
    <>
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </>
  );
}
