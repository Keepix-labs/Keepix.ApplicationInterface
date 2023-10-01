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

type DataSecretWallet = {
  privateKey: string;
};

export default function AppETHProofOfStakeAmount() {
  const params = useParams();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  const [data, setData] = useState<Data | null>(null);
  const [dataPrivateKey, setDataPrivateKey] = useState<DataSecretWallet | null>(
    null
  );

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

  const getWalletSecret = () => {
    if (!data) {
      return;
    }
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}${data.values.retrieveWalletSecretEndpoint}`
      )
        .then((res) => res.json())
        .then((data: DataSecretWallet) => {
          setDataPrivateKey(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <Loader />;

  return (
    <AppsBase
      title={"ETHProofOfStake Setup"}
      footer={
        dataPrivateKey && (
          <Btn href={`/apps/${params["app-slug"]}/transfer`}>Continue</Btn>
        )
      }
    >
      <div className={styles.main}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.cost}>
          Cost : {data.values.amount} {data.values.currency}
        </div>
        <div className={styles.address}>Address : {data.values.address}</div>
        <Btn onClick={getWalletSecret}>Get Wallet Secret</Btn>
        {dataPrivateKey && (
          <div className={styles.privateKey}>
            Your secret key : {dataPrivateKey.privateKey}
          </div>
        )}
        <FAQ />
      </div>
    </AppsBase>
  );
}
