"use client";

import { useParams } from "next/navigation";
import AppsBase from "../../AppsBase";
import styles from "./styles.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Btn from "@/components/Btn/Btn";

type LoanInfo = {
  value: string;
  loan: string;
  costOfLoan: string;
  rewardCommissions: string;
};

type Data = {
  componentName: string;
  title: string;
  nextPage: string;
  values: {
    amount: {
      defaultValue: string;
      values: LoanInfo[];
    };
  };
};

export default function AppETHProofOfStakeSetup() {
  const params = useParams();

  const [data, setData] = useState<Data | null>(null);
  const [currentInputOptionIndex, setCurrentInputOptionIndex] =
    useState<number>(0);
  const [currentLoanInfos, setCurrentLoanInfos] = useState<LoanInfo | null>(
    null
  );
  const inputOptions = [8, 16, 32];

  useEffect(() => {
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/1`
      )
        .then((res) => res.json())
        .then((data: Data) => {
          setData(data);
          setCurrentInputOptionIndex(
            inputOptions.indexOf(parseInt(data.values.amount.defaultValue))
          );
          setCurrentLoanInfos(
            data.values.amount.values.find(
              (value) => value.value === data.values.amount.defaultValue
            ) ?? null
          );
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!data) {
      return;
    }

    setCurrentInputOptionIndex(parseInt(evt.target.value));
    setCurrentLoanInfos(
      data.values.amount.values.find(
        (value) =>
          value.value === inputOptions[parseInt(evt.target.value)].toString()
      ) ?? null
    );
  };

  if (!data) return <Loader />;

  return (
    <AppsBase
      title={"ETHProofOfStake Setup"}
      footer={
        currentLoanInfos && (
          <Btn
            href={`/apps/${params["app-slug"]}/amount?amount=${inputOptions[currentInputOptionIndex]}`}
          >
            Confirm
          </Btn>
        )
      }
    >
      <div className={styles.main}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.ethToStake}>
          {inputOptions[currentInputOptionIndex]} ETH
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={currentInputOptionIndex}
          className={styles.input}
          onChange={onChange}
        />
        {currentLoanInfos && (
          <div className={styles.infos}>
            <div className={styles.info}>
              Loan : {currentLoanInfos?.loan} ETH
            </div>
            <div className={styles.info}>
              Cost of loan : {currentLoanInfos?.costOfLoan} ETH
            </div>
            <div className={styles.info}>
              Reward commissions : {currentLoanInfos?.rewardCommissions} ETH
            </div>
          </div>
        )}
      </div>
    </AppsBase>
  );
}
