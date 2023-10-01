"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import styles from "./styles.module.scss";
import Btn from "@/components/Btn/Btn";

type Data = {
  state: "IN_PROGRESS" | "DONE";
};

export default function AppETHProofOfStakeTransfer() {
  const params = useParams();

  const [data, setData] = useState<Data | null>(null);

  const checkDepositState = () => {
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/deposit-state`
      )
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);

          if (data.state === "IN_PROGRESS") {
            window.setTimeout(() => checkDepositState(), 1000);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkDepositState();
  }, []);

  if (!data) return <Loader />;

  return (
    <AppsBase
      title={"ETHProofOfStake Transfer"}
      footer={
        data.state === "DONE" && (
          <Btn href={`/apps/${params["app-slug"]}/install`}>Continue</Btn>
        )
      }
    >
      <div className={styles.main}>
        <div className={styles.state}>
          {data.state === "IN_PROGRESS"
            ? "Checking deposit in progress..."
            : "Deposit successful"}
        </div>
      </div>
    </AppsBase>
  );
}
