"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../Loader/Loader";
import { useParams } from "next/navigation";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import { useAPIContext } from "@/context/api/APIProvider";
import BannerAlert from "../BannerAlert/BannerAlert";

type Data = {
  id: string;
  title: string;
  subTitle: string;
  installed: boolean;
}[];

const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/list`;

export default function SidebarApps() {
  const params = useParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data>([]);
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
      setData(tempData.filter((app) => app.installed));
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
    <div className={styles.main}>
      <div className={styles.title}>Apps</div>

      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {!isDataLoading && !data.length && (
        <div className={styles.empty}>No app installed yet</div>
      )}
      {data.length !== 0 && (
        <ul className={styles.list}>
          {data.map((app, key) => (
            <li
              className={styles.item}
              key={key}
              data-active={params["app-slug"] === app.id}
            >
              <Link href={`/apps/${app.id}`} className={styles.itemLink}>
                <div className={styles.itemIcon}>
                  {/* <Icon name="web_asset" /> */}
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemTitle}>{app.title}</span>
                  <span className={styles.itemSubtitle}>{app.subTitle}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
