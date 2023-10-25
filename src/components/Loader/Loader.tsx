import styles from "./styles.module.scss";
import { Icon } from '@iconify-icon/react';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Icon icon="svg-spinners:180-ring-with-bg" /> 
      <span>Loading...</span>
    </div>
  );
}
