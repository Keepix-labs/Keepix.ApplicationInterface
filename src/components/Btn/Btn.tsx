"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { Icon } from '@iconify-icon/react';

type PropsBtn = {
  href?: string;
  icon?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function Btn({ href, icon, children, onClick }: PropsBtn) {

  const Content = (
    <>
      <span>{children}</span>
      {icon && <Icon icon={icon} />}
    </>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={styles.btn}>
        {Content}
      </button>
    )
  }

  if (!href) {
    return
  }

  return (
    <Link href={href} className={styles.btn}>
      {Content}
    </Link>
  )
}
