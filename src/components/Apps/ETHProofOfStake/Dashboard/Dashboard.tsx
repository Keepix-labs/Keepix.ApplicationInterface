"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import styles from "./styles.module.scss";

type Data = {
  componentName: string;
  title: string;
  values: {
    poolStateEndpoint: string;
  };
};

export default function AppETHProofOfStakeDashboard() {
  const params = useParams();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/0`;

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
    <AppsBase title={"Dashboard"}>
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && <div className={styles.main}>{data.title}</div>}
    </AppsBase>
  );
}
