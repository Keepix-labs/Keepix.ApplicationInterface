"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import React, { ReactNode } from "react";

export default function Icon({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={styles.main}>
      {children}
    </Link>
  );
}
