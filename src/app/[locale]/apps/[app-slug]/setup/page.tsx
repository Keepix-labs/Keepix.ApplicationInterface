"use client";

import ETHProofOfStakeSetup from "@/components/Apps/ETHProofOfStake/Setup/Setup";
import { useParams } from "next/navigation";

export default function AppsSlugSetupView() {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStakeSetup,
  };

  const params = useParams();

  return (
    <>
      {params["app-slug"] && apps[params["app-slug"] as string]()}
    </>
  );
}
