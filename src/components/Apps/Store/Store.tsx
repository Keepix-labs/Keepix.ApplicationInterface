import { useEffect, useState } from "react";
import AppsBase from "../AppsBase";
import styles from "./styles.module.scss";
import Icon from "@/components/Icon/Icon";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import Btn from "@/components/Btn/Btn";

type App = {
  id: string;
  title: string;
  subTitle: string;
  installed: boolean;
};

export default function AppsStore() {
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/plugin/list`)
        .then((res) => res.json())
        .then((data) => {
          setApps(data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AppsBase title="AppsStore">
      {isLoading && <Loader />}
      {apps.length !== 0 && (
        <ul className={styles.list}>
          {apps.map((app, key) => (
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
    </AppsBase>
  );
}
