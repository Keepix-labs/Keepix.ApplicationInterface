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
import Progress from '@/components/Progress/Progress';

type Data = {
  title: string;
};

type DataInstallState = {
  percentage: number;
};

export default function AppETHProofOfStakeInstall() {
  const params = useParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [dataInstallState, setDataInstallState] =
    useState<DataInstallState | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/5`;
  const fetchInstallStateUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/install-state`;

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchUrl, setAPIState);
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

      response = await safeFetch(fetchInstallStateUrl, setAPIState);
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

  return (    
    <AppsBase title="ETHProofOfStake" subTitle="Installation..." icon="cryptocurrency:eth" color="64 173 230">

      {/* {isDataLoading && <Loader />} */}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      <div className="install card card-default">
        {data && (
          <>
            {dataInstallState && (
              <>
                <h2 className="h2">
                  {dataInstallState.percentage === 100 ? "Installation done !" : "Installation in progress..."}
                </h2>
                <Progress percent={dataInstallState.percentage} />
                {dataInstallState.percentage === 100 && (
                  <Btn href={`/apps/${params["app-slug"]}`} icon="ph:arrow-right" status="success">Dashboard</Btn>
                )}
              </>
            )}
          </>
        )}
      </div>
    </AppsBase>
  );
}
