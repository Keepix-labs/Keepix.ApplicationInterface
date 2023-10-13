"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Icon } from '@iconify-icon/react';

type Props = {
  title: string;
  subTitle?: string;
  icon?: string;
  children: ReactNode;
};

export default function AppsBase({ title, subTitle, icon = 'ph:house-simple', children }: Props) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <Icon icon={icon} />
        </div>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>{title}</h1>
          {subTitle && (
            <div className={styles.headerSubtitle}>{subTitle}</div>
          )}
        </div>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
}
