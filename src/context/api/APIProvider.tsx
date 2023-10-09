"use client";

import styles from "./styles.module.scss";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export type APIState = "UP" | "WAITING" | "UNREACHABLE";

type APIContextValue = {
  apiState: APIState | null;
  setAPIState: Dispatch<SetStateAction<APIState | null>>;
};

export const APIContext = createContext<APIContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const useAPIContext = () => {
  const apiContext = useContext(APIContext);
  if (apiContext === undefined) {
    throw new Error("useAPIContext must be inside a APIProvider");
  }
  return apiContext;
};

export default function APIProvider({ children }: Props) {
  const [apiState, setAPIState] = useState<APIContextValue["apiState"]>(null);

  return (
    <APIContext.Provider value={{ apiState, setAPIState }}>
      {children}
      {apiState === "WAITING" && (
        <div className={styles.main}>
          <div className={styles.text}>
            Trying to reconnect to your Keepix please wait.
          </div>
        </div>
      )}
      {apiState === "UNREACHABLE" && (
        <div className={styles.main}>
          <div className={styles.text}>
            Keepix network unreachable, please reset the network using the WAP
            installation or ethernet after rebooting your device.
            <br />
            Go to <a href="https://keepix.io/setup">keepix.io/setup</a> to
            relink the network.
          </div>
        </div>
      )}
    </APIContext.Provider>
  );
}
