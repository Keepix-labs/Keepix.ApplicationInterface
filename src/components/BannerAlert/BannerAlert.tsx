import { ReactNode } from "react";
import styles from "./styles.module.scss";

type Status = "info" | "success" | "warning" | "danger";

type Props = {
  status: Status;
  children: ReactNode;
};

export default function BannerAlert({ status, children }: Props) {
  return (
    <div className={styles.main} data-status={status}>
      {children}
    </div>
  );
}
