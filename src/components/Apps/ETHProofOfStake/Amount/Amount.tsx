"use client";

import { useParams, useSearchParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Btn from "@/components/Btn/Btn";
import FAQ from "@/components/FAQ/FAQ";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import { useAPIContext } from "@/context/api/APIProvider";

type Data = {
  title: string;
  amount: string;
  currency: string;
  address: string;
};

type DataSecretWallet = {
  privateKey: string;
};

export default function AppETHProofOfStakeAmount() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [secretKeyDownloaded, setSecretKeyDownloaded] =
    useState<boolean>(false);

  const amount = searchParams.get("amount") || "0";
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/3?amount=${amount}`;
  const fetchWalletSecretUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/wallet-secret`;

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchUrl, setAPIState);
      tempData = await response.json();
      setData(tempData);
    } catch (e) {
      setError(getErrorMsg(e));
    } finally {
      setDataLoading(false);
    }
  };

  const fetchWalletSecret = async () => {
    if (!data) {
      return;
    }

    let response: Response;
    let tempData: DataSecretWallet;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchWalletSecretUrl, setAPIState);
      tempData = await response.json();

      const element = document.createElement("a");
      const file = new Blob([tempData.privateKey], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "secretKey.txt";
      document.body.appendChild(element);
      element.click();

      setSecretKeyDownloaded(true);
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
    <AppsBase title="ETHProofOfStake" subTitle="2/2 • Setup your app" icon="cryptocurrency:eth" color="64 173 230">

      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <>
          <div className="card card-default">
            <h2 className="h2">{data.title}</h2>
            <div className="table">
              <table>
                <tr>
                  <td>Cost</td>
                  <td><strong>{data.amount} {data.currency}</strong></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td><strong>{data.address}</strong></td>
                </tr>
              </table>
            </div>
            <div className="btn-group">
              <Btn onClick={fetchWalletSecret} icon="ph:key">Get Wallet Secret</Btn>
              {secretKeyDownloaded && (
                <Btn href={`/apps/${params["app-slug"]}/transfer`} icon="ph:arrow-right" status="success">Continue</Btn>
              )}
            </div>
          </div>
          <FAQ />
        </>
      )}
    </AppsBase>
  );
}
