import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Monitor from "@/components/Monitor/Monitor";

export default function MonitorView() {
  return (
    <>
      <Sidebar />
      <Monitor />
    </>
  );
}
