"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { Icon } from '@iconify-icon/react';

type Status = "info" | "success" | "warning" | "danger"

type PropsBtn = {
  href?: string;
  icon?: string;
  status?: Status;
  onClick?: () => void;
  children: ReactNode;
}

export default function Btn({ href, icon, children, status, onClick }: PropsBtn) {

  const Content = (
    <>
      <span>{children}</span>
      {icon && <Icon icon={icon} />}
    </>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={styles.btn} data-status={status}>
        {Content}
      </button>
    )
  }

  if (!href) {
    return
  }

  return (
    <Link href={href} className={styles.btn} data-status={status}>
      {Content}
    </Link>
  )
}
