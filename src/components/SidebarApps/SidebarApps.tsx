"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import Link from "next/link";

type App = {
  id: string;
  title: string;
  subTitle: string;
};

export default function SidebarApps({ activeSlug }: { activeSlug: string }) {
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
    <div className={styles.main}>
      <div className={styles.title}>Apps</div>
      {isLoading && <div>Loading...</div>}
      {apps.length !== 0 && (
        <ul className={styles.list}>
          {apps.map((app, key) => (
            <li
              className={styles.item}
              key={key}
              data-active={activeSlug === app.id}
            >
              <Link href={`/apps/${app.id}`} className={styles.itemLink}>
                <div className={styles.itemIcon}>
                  <Icon name="web_asset" />
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
