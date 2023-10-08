"use client";

import styles from "./styles.module.scss";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type APIContextValue = {
  isAPIDown: boolean | null;
  setIsAPIDown: Dispatch<SetStateAction<boolean | null>>;
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
  const [isAPIDown, setIsAPIDown] =
    useState<APIContextValue["isAPIDown"]>(false);

  return (
    <APIContext.Provider value={{ isAPIDown, setIsAPIDown }}>
      {children}
      {isAPIDown && (
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
