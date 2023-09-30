"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

type Data = {
  componentName: string;
  title: string;
  nextPage: string;
  values: {
    amount: {
      defaultValue: string;
      values: [
        {
          value: string;
          loan: string;
          costOfLoan: string;
          rewardCommissions: string;
        }
      ];
    };
  };
};

export default function AppETHProofOfStakeSetup() {
  const params = useParams();

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/1`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!data) return <Loader />;

  return <AppsBase title={data?.title}>AppETHProofOfStakeSetup</AppsBase>;
}
