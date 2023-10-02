"use client";

import { useParams, useSearchParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Btn from "@/components/Btn/Btn";
import FAQ from "@/components/FAQ/FAQ";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";

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

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [secretKeyDownloaded, setSecretKeyDownloaded] =
    useState<boolean>(false);

  const amount = searchParams.get("amount") || "0";
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/2?amount=${amount}`;
  const fetchWalletSecretUrl = data
    ? `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}${data.values.retrieveWalletSecretEndpoint}`
    : "";

  const fetchData = () => {
    try {
      setError(null);
      setDataLoading(true);

      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);
        });
    } catch (e) {
      setError(getErrorMsg(e));
    } finally {
      setDataLoading(false);
    }
  };

  const fetchWalletSecret = () => {
    if (!data) {
      return;
    }
    try {
      setError(null);
      setDataLoading(true);

      fetch(fetchWalletSecretUrl)
        .then((res) => res.json())
        .then((data: DataSecretWallet) => {
          const element = document.createElement("a");
          const file = new Blob([data.privateKey], { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = "secretKey.txt";
          document.body.appendChild(element);
          element.click();

          setSecretKeyDownloaded(true);
        });
    } catch (e) {
      setError(getErrorMsg(e));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppsBase
      title={"ETHProofOfStake Setup"}
      footer={
        secretKeyDownloaded && (
          <Btn href={`/apps/${params["app-slug"]}/transfer`}>Continue</Btn>
        )
      }
    >
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <div className={styles.main}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.cost}>
            Cost : {data.values.amount} {data.values.currency}
          </div>
          <div className={styles.address}>Address : {data.values.address}</div>
          <Btn onClick={fetchWalletSecret}>Get Wallet Secret</Btn>
          <FAQ />
        </div>
      )}
    </AppsBase>
  );
}
