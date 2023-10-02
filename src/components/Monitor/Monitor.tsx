"use client";

import { useEffect, useState } from "react";
import AppsBase from "../Apps/AppsBase";
import styles from "./styles.module.scss";
import Loader from "../Loader/Loader";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "../BannerAlert/BannerAlert";

type Data = {
  cpu: string;
  memory: {
    free: string;
    used: string;
    total: string;
  };
};

const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/monitoring/keepix`;

export default function Monitor() {
  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    try {
      setError(null);
      setDataLoading(true);

      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);

          window.setTimeout(() => {
            fetchData();
          }, 1000);
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
    <AppsBase title="Monitor">
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <div className={styles.main}>
          <div className={styles.cpu}>CPU : {data.cpu}</div>
          <div className={styles.memory}>
            Memory : {data.memory.used} used of {data.memory.total}
          </div>
        </div>
      )}
    </AppsBase>
  );
}
