"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import React, { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function Icon({ href, children, onClick }: Props) {
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
