"use client";

import { useEffect, useState } from "react";
import AppsBase from "../Apps/AppsBase";
import styles from "./styles.module.scss";
import Loader from "../Loader/Loader";

type Data = {
  cpu: string;
  memory: {
    free: string;
    used: string;
    total: string;
  };
};

export default function Monitor() {
  const [data, setData] = useState<Data | null>(null);

  const checkData = () => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring/keepix`)
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);

          window.setTimeout(() => {
            checkData();
          }, 1000);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkData();
  }, []);

  if (!data) return <Loader />;

  return (
    <AppsBase title="Monitor">
      <div className={styles.cpu}>CPU : {data.cpu}</div>
      <div className={styles.memory}>
        Memory : {data.memory.used} used of {data.memory.total}
      </div>
    </AppsBase>
  );
}
