"use client";

import BannerAlert from "@/components/BannerAlert/BannerAlert";
import Btn from "@/components/Btn/Btn";
import { Form, Input } from '@/components/Form/Form';
import Loader from "@/components/Loader/Loader";
import { useAPIContext } from "@/context/api/APIProvider";
import { getErrorMsg, safeFetch } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import AppsBase from "../../AppsBase";
import styles from "./styles.module.scss";

type LoanInfo = {
  value: string;
  loan: string;
  costOfLoan: string;
  rewardCommissions: string;
};

type Data = {
  title: string;
  amount: {
    defaultValue: string;
    values: LoanInfo[];
  };
};

export default function AppETHProofOfStakeSetup() {
  const params = useParams();
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentInputOptionIndex, setCurrentInputOptionIndex] =
    useState<number>(0);
  const [currentLoanInfos, setCurrentLoanInfos] = useState<LoanInfo | null>(
    null
  );

  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/plugin/${params["app-slug"]}/page/1`;
  const inputOptions = [8, 16, 32];

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!data) {
      return;
    }

    setCurrentInputOptionIndex(parseInt(evt.target.value));
    setCurrentLoanInfos(
      data.amount.values.find(
        (value) =>
          value.value === inputOptions[parseInt(evt.target.value)].toString()
      ) ?? null
    );
  };

  const fetchData = async () => {
    let response: Response;
    let tempData: Data;

    try {
      setError(null);
      setDataLoading(true);

      response = await safeFetch(fetchUrl, setAPIState);
      tempData = await response.json();
      setData(tempData);
      setCurrentInputOptionIndex(
        inputOptions.indexOf(parseInt(tempData.amount.defaultValue))
      );
      setCurrentLoanInfos(
        tempData.amount.values.find(
          (value) => value.value === tempData.amount.defaultValue
        ) ?? null
      );
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
    <AppsBase title="ETHProofOfStake" subTitle="1/2 • Setup your app" icon="cryptocurrency:eth" color="64 173 230">

      {isDataLoading && <Loader />}
      {error && <BannerAlert status="danger">{error}</BannerAlert>}

      {data && (
        <Form>
          <h2 className="h2">{data.title}</h2>

          <Input label="Select an ETH amount" name="ethAmount" icon="cryptocurrency:eth" required={true}>
            <strong>{inputOptions[currentInputOptionIndex]} ETH</strong>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={currentInputOptionIndex}
              className={styles.input}
              onChange={onChange}
            />
          </Input>

          {currentLoanInfos && (
            <>
              <div className="table">
                <table>
                  <tr>
                    <td>Loan</td>
                    <td><strong>{currentLoanInfos?.loan} ETH</strong></td>
                  </tr>
                  <tr>
                    <td>Cost of loan</td>
                    <td><strong>{currentLoanInfos?.costOfLoan} ETH</strong></td>
                  </tr>
                  <tr>
                    <td>Reward commissions</td>
                    <td><strong>{currentLoanInfos?.rewardCommissions} ETH</strong></td>
                  </tr>
                </table>
              </div>
              <div className="btn-group">
                <Btn href={`/apps/${params["app-slug"]}/amount?amount=${inputOptions[currentInputOptionIndex]}`} icon="ph:check-circle" status="success">
                  Confirm
                </Btn>
              </div>
            </>
          )}
        </Form>
      )}
    </AppsBase>
  );
}
