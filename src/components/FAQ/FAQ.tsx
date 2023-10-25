import styles from "./styles.module.scss";

type Question = {
  title: string;
  desc: string;
};

const questions: Question[] = [
  {
    title: "How much does it cost ?",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, qui expedita totam voluptatem consectetur dolores vel neque pariatur. Consequuntur veniam repellendus minus saepe culpa maiores, reprehenderit tempora perferendis quo? A!",
  },
  {
    title: "How much does it cost ?",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, qui expedita totam voluptatem consectetur dolores vel neque pariatur. Consequuntur veniam repellendus minus saepe culpa maiores, reprehenderit tempora perferendis quo? A!",
  },
  {
    title: "How much does it cost ?",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, qui expedita totam voluptatem consectetur dolores vel neque pariatur. Consequuntur veniam repellendus minus saepe culpa maiores, reprehenderit tempora perferendis quo? A!",
  },
  {
    title: "How much does it cost ?",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, qui expedita totam voluptatem consectetur dolores vel neque pariatur. Consequuntur veniam repellendus minus saepe culpa maiores, reprehenderit tempora perferendis quo? A!",
  },
];

export default function FAQ() {
  return (
    <div className="card card-default">
      <h2 className="h2">FAQ</h2>
      <dl className={styles.questions}>
        {questions.map((question) => (
          <details className={styles.question} key={question.title}>
            <summary className={styles.questionTitle}>
              <span>{question.title}</span>
            </summary>
            <div className={styles.questionDesc}>{question.desc}</div>
          </details>
        ))}
      </dl>
    </div>
  );
}
