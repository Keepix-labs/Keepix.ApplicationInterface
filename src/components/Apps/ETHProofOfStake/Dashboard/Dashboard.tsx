"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import styles from "./styles.module.scss";
import { useAPIContext } from "@/context/api/APIProvider";
import {KEEPIX_API_URL} from "../../../../constants"

type Data = {
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

export default function AppETHProofOfStakeDashboard() {
  const params = useParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${KEEPIX_API_URL}/plugin/${params["app-slug"]}/page/0`;

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchUrl, setAPIState);
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

  return (
    <AppsBase title="ETHProofOfStake" subTitle="Dashboard" icon="cryptocurrency:eth" color="64 173 230">
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && <div className={styles.main}>{data.title}</div>}
    </AppsBase>
  );
}
