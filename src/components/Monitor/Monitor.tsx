"use client";

import { useEffect, useState } from "react";
import AppsBase from "../Apps/AppsBase";
import styles from "./styles.module.scss";
import Loader from "../Loader/Loader";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import BannerAlert from "../BannerAlert/BannerAlert";
import { useAPIContext } from "@/context/api/APIProvider";

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
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchUrl, setAPIState);
      tempData = await response.json();
      setData(data);

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
