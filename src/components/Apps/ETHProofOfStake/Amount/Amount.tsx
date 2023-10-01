"use client";

import { useParams, useSearchParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import styles from "./styles.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Btn from "@/components/Btn/Btn";
import { useRouter } from "next/router";
import FAQ from "@/components/FAQ/FAQ";

type Data = {
  componentName: string;
  title: string;
  nextPage: string;
  values: {
    amount: string;
    currency: string;
    address: string;
    retrieveWalletSecretEndpoint: string;
  };
};

export default function AppETHProofOfStakeSetup() {
  const params = useParams();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (!amount) {
      return;
    }

    try {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/2?amount=${amount}`
      )
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!data) return <Loader />;

  return (
    <AppsBase title={"ETHProofOfStake Setup"}>
      <div className={styles.main}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.cost}>
          Cost : {data.values.amount} {data.values.currency}
        </div>
        <div className={styles.address}>Address : {data.values.address}</div>
        <FAQ />
      </div>
    </AppsBase>
  );
}
