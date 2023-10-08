"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import styles from "./styles.module.scss";
import { useAPIContext } from "@/context/api/APIProvider";

type Data = {
  componentName: string;
  title: string;
  values: {
    title: string;
    subTitle: string;
    description: string;
    poolStateEndpoint: string;
    installed: boolean;
    state: string;
    alerts: string[];
    APY: {
      "7d": string;
      "30d": string;
      "1Y": string;
    };
    locked: {
      ETH: string;
      RPL: string;
    };
    stakingType: string;
    rewards: {
      "24h": string;
      "7d": string;
      total: string;
    };
    memory: {
      free: string;
      used: string;
      total: string;
    };
    grafanaLink: string;
    etherScanLink: string;
    beanconScanLink: string;
    ipcLogsStreamEndpoint: string;
    ipcPostCommandLineEndpoint: string;
    stopEndpoint: string;
    startEndpoint: string;
    uninstallEndpoint: string;
    withdrawPostRewardsEndpoint: string;
  };
};

export default function AppETHProofOfStakeDashboard() {
  const params = useParams();
  const { setIsAPIDown } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/0`;

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await fetch(fetchUrl);
      tempData = await response.json();
      setData(tempData);

      window.setTimeout(() => {
        fetchData();
      }, 1000);
    } catch (e) {
      setError(getErrorMsg(e));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error === "Failed to fetch") {
      setIsAPIDown(true);
    }
  }, [error]);

  return (
    <AppsBase title={"Dashboard"}>
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && <div className={styles.main}>{data.title}</div>}
    </AppsBase>
  );
}
