"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import styles from "./styles.module.scss";
import Btn from "@/components/Btn/Btn";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";

type Data = {
  state: "IN_PROGRESS" | "DONE";
};

export default function AppETHProofOfStakeTransfer() {
  const params = useParams();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/deposit-state`;

  const fetchData = () => {
    try {
      setError(null);
      setDataLoading(true);

      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);

          if (data.state === "IN_PROGRESS") {
            window.setTimeout(() => fetchData(), 1000);
          }
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
      title={"ETHProofOfStake Transfer"}
      footer={
        data &&
        data.state === "DONE" && (
          <Btn href={`/apps/${params["app-slug"]}/install`}>Continue</Btn>
        )
      }
    >
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <div className={styles.main}>
          <div className={styles.state}>
            {data.state === "IN_PROGRESS"
              ? "Checking deposit in progress..."
              : "Deposit successful"}
          </div>
        </div>
      )}
    </AppsBase>
  );
}
