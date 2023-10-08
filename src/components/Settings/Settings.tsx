"use client";

import AppsBase from "../Apps/AppsBase";
import styles from "./styles.module.scss";

export default function Monitor() {
  return (
    <AppsBase title="Settings">
      <div className={styles.main}>
        <div className={styles.runningApp}>
          <span>Max number of running app :</span>
          <input type="number" min="0" />
        </div>
        <div className={styles.runningApp}>
          <span>Enable Leds of the Keepix :</span>
          <input type="checkbox" />
        </div>
      </div>
    </AppsBase>
  );
}
