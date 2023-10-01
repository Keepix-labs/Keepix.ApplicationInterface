"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import styles from "./styles.module.scss";
import Btn from "@/components/Btn/Btn";

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

  const [data, setData] = useState<Data | null>(null);
  const [dataInstallState, setDataInstallState] =
    useState<DataInstallState | null>(null);

  const checkInstallState = () => {
    console.log("data", data);
    if (!data) {
      return;
    }
    try {
      console.log(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}${data.values.poolStateEndpoint}`
      );
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}${data.values.poolStateEndpoint}`
      )
        .then((res) => res.json())
        .then((data: DataInstallState) => {
          setDataInstallState(data);

          if (data.percentage !== 100) {
            window.setTimeout(() => checkInstallState(), 1000);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/4`
      )
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    checkInstallState();
  }, [data]);

  if (!data) return <Loader />;

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
    </AppsBase>
  );
}
