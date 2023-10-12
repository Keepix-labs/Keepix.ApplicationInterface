"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = {
  title: string;
  children: ReactNode;
};

export default function AppsBase({ title, children }: Props) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          {/* <Icon name="web_asset" /> */}
        </div>
        <div className={styles.headerContent}>
          <span className={styles.headerTitle}>{title}</span>
        </div>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
}
