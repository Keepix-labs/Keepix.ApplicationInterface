import { useEffect, useState } from "react";
import AppsBase from "../AppsBase";
import styles from "./styles.module.scss";
import Icon from "@/components/Icon/Icon";
import Loader from "@/components/Loader/Loader";
import Btn from "@/components/Btn/Btn";
import { getErrorMsg } from "@/lib/utils";
import BannerAlert from "@/components/BannerAlert/BannerAlert";

type Data = {
  id: string;
  title: string;
  subTitle: string;
  installed: boolean;
}[];

const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/list`;

export default function AppsStore() {
  const [data, setData] = useState<Data>([]);
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
    <AppsBase title="AppsStore">
      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <div className={styles.main}>
          {data.length !== 0 && (
            <ul className={styles.list}>
              {data.map((app, key) => (
                <li className={styles.item} key={key}>
                  <div className={styles.itemIcon}>
                    <Icon name="web_asset" />
                  </div>
                  <div className={styles.itemContent}>
                    <span className={styles.itemTitle}>{app.title}</span>
                    <span className={styles.itemInstall}>
                      {app.installed ? "Installed" : "Not installed"}
                    </span>
                  </div>
                  {!app.installed && (
                    <div className={styles.itemFooter}>
                      <Btn href={`/apps/${app.id}/setup`}>Install</Btn>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </AppsBase>
  );
}
