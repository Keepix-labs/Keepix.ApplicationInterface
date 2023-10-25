"use client";

import ETHProofOfStakeAmount from "@/components/Apps/ETHProofOfStake/Amount/Amount";
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
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </>
  );
}
