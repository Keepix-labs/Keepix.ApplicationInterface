import ETHProofOfStake from "@/components/Apps/ETHProofOfStake/ETHProofOfStake";
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AppsSlug({ params }: { params: { slug: string } }) {
  const apps: {
    [key: string]: () => JSX.Element;
  } = {
    "eth-proof-of-stake": ETHProofOfStake,
  };

  return (
    <main className={styles.main}>
      <Sidebar activeSlug={params.slug} />
      {apps[params.slug]()}
    </main>
  );
}
