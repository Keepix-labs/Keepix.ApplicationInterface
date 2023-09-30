"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";
import Icon from "../Icon/Icon";
import Link from "next/link";
import { useParams } from "next/navigation";
import Btn from "../Btn/Btn";

export default function AppsBase({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const params = useParams();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <Icon name="web_asset" />
        </div>
        <div className={styles.headerContent}>
          <span className={styles.headerTitle}>{title}</span>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>{footer}</footer>
    </main>
  );
}
