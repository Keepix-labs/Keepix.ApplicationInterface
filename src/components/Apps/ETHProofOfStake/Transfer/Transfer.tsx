"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import styles from "./styles.module.scss";
import Btn from "@/components/Btn/Btn";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import { useAPIContext } from "@/context/api/APIProvider";

type Data = {
  state: "IN_PROGRESS" | "DONE";
};

export default function AppETHProofOfStakeTransfer() {
  const params = useParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/deposit-state`;

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchUrl, setAPIState);
      tempData = await response.json();

      setData(tempData);

      if (tempData.state === "IN_PROGRESS") {
        window.setTimeout(() => fetchData(), 1000);
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

  return (
    <AppsBase title="ETHProofOfStake" subTitle="Transfer..." icon="cryptocurrency:eth" color="64 173 230">

      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <>
          <div className="card card-default">
            <div className={styles.state}>
              {data.state === "IN_PROGRESS"
                ? "Checking deposit in progress..."
                : "Deposit successful"}
            </div>
          </div>
          {data.state === "DONE" && (
            <div className="btn-group">
              <Btn href={`/apps/${params["app-slug"]}/install`} status="success" icon="ph:arrow-right">Continue</Btn>
            </div>
          )}
        </>
      )}
    </AppsBase>
  );
}
