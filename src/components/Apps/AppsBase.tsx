import { ReactNode } from "react";
import styles from "./styles.module.scss";

export default function AppsBase({ children }: { children: ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
