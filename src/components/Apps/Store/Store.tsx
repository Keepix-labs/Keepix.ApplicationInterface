import { useEffect, useState } from "react";
import AppsBase from "../AppsBase";
import styles from "./styles.module.scss";
import Loader from "@/components/Loader/Loader";
import Btn from "@/components/Btn/Btn";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";
import { useAPIContext } from "@/context/api/APIProvider";
import { Icon } from '@iconify-icon/react';
import { KEEPIX_API_URL } from "@/constants";

type Data = {
  id: string;
  title: string;
  subTitle: string;
  installed: boolean;
}[];

const fetchUrl = `${KEEPIX_API_URL}/plugin/list`;

export default function AppsStore() {
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
      setData(tempData);
    } catch (e) {
      setError(getErrorMsg(e));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const style = { "--color": "64 173 230" } as React.CSSProperties

  return (
    <AppsBase title="Apps Store" subTitle="Add a new app on your Keepix" icon="ph:plus-square">
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <>
          {data.length !== 0 && (
            <ul className="grid">
              {data.map((app, key) => (
                <li key={key} className={styles.item} style={style}>
                  <div className={`${styles.itemCard} card`}>
                    <div className={`${styles.itemIcon} icon-app`}>
                      <Icon icon="cryptocurrency:eth" />
                    </div>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemTitle}>{app.title}</h3>
                      <span className={styles.itemInstall}>
                        {app.installed ? (<span>Installed</span>) : "Not installed"}
                      </span>
                    </div>
                    {!app.installed && (
                      <div className={styles.itemFooter}>
                        <Btn href={`/apps/${app.id}/setup`} icon="ph:download">Install</Btn>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AppsBase>
  );
}
