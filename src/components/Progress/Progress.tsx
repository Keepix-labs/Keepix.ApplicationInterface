"use client";

import styles from "./styles.module.scss";
import { Icon } from '@iconify-icon/react';

type Props = {
  percent?: number;
}

export default function Progress({ percent = 0 }: Props) {
  return (
    <div className={`${styles.progress} ${percent === 100 && styles.complete}`}>
      <Icon className={styles.progressIcon} icon={percent === 100 ? "ph:check-circle-duotone" : "svg-spinners:6-dots-scale-middle"} />
      <div className={styles.progressBar} style={{ width: `${percent}%` }}></div>
      <span>{percent}%</span>
    </div>
  )
}
