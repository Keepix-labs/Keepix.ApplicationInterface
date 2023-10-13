import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Icon } from '@iconify-icon/react';

type Status = "info" | "success" | "warning" | "danger";

type Props = {
  status: Status;
  children: ReactNode;
};

export default function BannerAlert({ status, children }: Props) {

  const statusIcons = {
    info: "ph:info",
    success: "ph:check-circle",
    warning: "ph:warning",
    danger: "ph:x-circle",
  }

  const icon = statusIcons[status] || "ph:question"

  return (
    <div className={styles.main} data-status={status}>
      <Icon icon={icon} />
      <span>{children}</span>
    </div>
  );
}
