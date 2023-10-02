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
    <div className={styles.main}>
      <div className={styles.title}>FAQ</div>
      <div className={styles.questions}>
        {questions.map((question) => (
          <div className={styles.question} key={question.title}>
            <div className={styles.questionTitle}>{question.title}</div>
            <div className={styles.questionDesc}>{question.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
