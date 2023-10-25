"use client";

import { KEEPIX_API_URL } from "@/constants";
import AppsBase from "../Apps/AppsBase";
import { Form, Input, Checkbox } from "../Form/Form";
import { useAPIContext } from "@/context/api/APIProvider";
import { safeFetch, getErrorMsg } from "@/lib/utils";
import { useState, useEffect } from "react";
import BannerAlert from "../BannerAlert/BannerAlert";
import Loader from "../Loader/Loader";

type Data = {
  "keepix-name": string;
};

const fetchUrl = `${KEEPIX_API_URL}/settings`;

export default function Settings() {
  const { setAPIState } = useAPIContext();

  const [data, setData] = useState<Data | null>(null);
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

  return (
    <AppsBase
      title="Settings"
      subTitle="Define your Keepix preferences"
      icon="ph:sliders-horizontal"
    >
      <Form>
        <h2 className="h2">Preferences Keepix</h2>

        {isDataLoading && <Loader />}
        {error && <BannerAlert status="danger">{error}</BannerAlert>}

        {data && (
          <>
            <Input
              label="Name of the device"
              name="name"
              icon="material-symbols:edit"
              required={true}
            >
              <input
                type="text"
                min="0"
                id="name"
                value={data["keepix-name"]}
                placeholder="Name here"
              />
            </Input>
            <Input
              label="Max number of running app"
              name="maxNumber"
              icon="ph:list-numbers"
              required={true}
            >
              <input
                type="number"
                min="0"
                id="maxNumber"
                placeholder="Max number here"
              />
            </Input>
            <Checkbox
              name="leds"
              label="Enable Leds of the Keepix"
              enabled="On"
              disabled="Off"
            />
          </>
        )}
      </Form>
    </AppsBase>
  );
}
