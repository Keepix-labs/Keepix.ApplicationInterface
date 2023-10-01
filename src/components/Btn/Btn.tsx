"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import React, { ReactNode } from "react";

export default function Icon({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (onClick) {
    return (
      <button onClick={onClick} className={styles.main}>
        {children}
      </button>
    );
  }

  if (!href) {
    return;
  }

  return (
    <Link href={href} className={styles.main}>
      {children}
    </Link>
  );
}
