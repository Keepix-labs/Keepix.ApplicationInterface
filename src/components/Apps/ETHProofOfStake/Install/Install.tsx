"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import styles from "./styles.module.scss";
import Btn from "@/components/Btn/Btn";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import { useAPIContext } from "@/context/api/APIProvider";

type Data = {
  componentName: string;
  title: string;
  nextPage: string;
  values: {
    poolStateEndpoint: string;
    whenFinished: string;
  };
};

type DataInstallState = {
  percentage: number;
};

export default function AppETHProofOfStakeInstall() {
  const params = useParams();
  const { setIsAPIDown } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [dataInstallState, setDataInstallState] =
    useState<DataInstallState | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/4`;
  const fetchInstallStateUrl = data
    ? `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}${data.values.poolStateEndpoint}`
    : "";

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await fetch(fetchUrl);
      tempData = await response.json();
      setData(tempData);
    } catch (e) {
      setError(getErrorMsg(e));
    } finally {
      setDataLoading(false);
    }
  };

  const fetchInstallState = async () => {
    if (!data) {
      return;
    }

    let response: Response;
    let tempData: DataInstallState;

    try {
      setError(null);
      setDataLoading(true);

      response = await fetch(fetchInstallStateUrl);
      tempData = await response.json();
      setDataInstallState(tempData);

      if (tempData.percentage !== 100) {
        window.setTimeout(() => fetchInstallState(), 1000);
      }
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
    fetchInstallState();
  }, [data]);

  useEffect(() => {
    if (error === "Failed to fetch") {
      setIsAPIDown(true);
    }
  }, [error]);

  return (
    <AppsBase
      title={"ETHProofOfStake Install"}
      footer={
        dataInstallState &&
        dataInstallState.percentage === 100 && (
          <Btn href={`/apps/${params["app-slug"]}`}>Dashboard</Btn>
        )
      }
    >
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <div className={styles.main}>
          <div className={styles.title}>{data.title}</div>
          {dataInstallState && dataInstallState.percentage !== 100 && (
            <div className={styles.installState}>
              Installation in progress : {dataInstallState.percentage}%
            </div>
          )}
          {dataInstallState && dataInstallState.percentage === 100 && (
            <div className={styles.installState}>Installation done !</div>
          )}
        </div>
      )}
    </AppsBase>
  );
}
