"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import "./styles.scss";
import Btn from "@/components/Btn/Btn";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import { useAPIContext } from "@/context/api/APIProvider";
import Logo from '@/components/Logo/Logo';
import { Icon } from '@iconify-icon/react';
import { KEEPIX_API_URL } from "@/constants";

type Data = {
  state: "IN_PROGRESS" | "DONE";
};

export default function AppETHProofOfStakeTransfer() {
  const params = useParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${KEEPIX_API_URL}/plugin/${params["app-slug"]}/deposit-state`;

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

      {/* {isDataLoading && <Loader />} */}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <>
          <div className={`transfer card card-default ${data.state}`}>
            <div className="state">
              <div className="state-logo">
                <Logo text={false} />
              </div>
              <div className="state-title">
                {data.state === "IN_PROGRESS" ? (
                  <>
                    <span>Checking deposit</span>
                    <strong>in progress <Icon icon="svg-spinners:3-dots-scale" /></strong>
                  </>
                ) : (
                  <>
                    <span>Deposit</span>
                    <strong>Successful</strong>
                  </>
                )}
              </div>
              {data.state === "DONE" && (
                <div className="btn-group">
                  <Btn href={`/apps/${params["app-slug"]}/install`} status="success" icon="ph:arrow-right">Continue</Btn>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AppsBase>
  );
}
