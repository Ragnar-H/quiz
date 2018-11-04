/* @flow */
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { IQuestion } from "./QuestionsContainer";

export const Questions: Array<IQuestion> = [
  {
    question: "Potato",
    answer: "What is amazing food?",
    category: "Leo",
    points: 500
  },
  {
    question: "Lion",
    answer: "What is the Leo Pharma logo?",
    category: "Leo",
    points: 300
  },
  {
    question: "Apple and NewSec",
    answer: "Who are our neighbours?",
    category: "Innovation",
    points: 300
  },
  {
    question: "Illum",
    answer: "Who lives above us?",
    category: "Innovation",
    points: 700
  },
  {
    question: "Matt Avis",
    answer: "Who is the reigning Ping Pong champion?",
    category: "Famous people",
    points: 300
  },
  {
    question: "Silkegade 8",
    answer: "What is the address of our office?",
    category: "Random",
    points: 300
  }
];

export async function loadStaticQuestionsToFirestore(
  firestore: any,
  gameId: string
) {
  let writeBatch = firestore.batch();

  Questions.forEach(question => {
    const docRef = firestore
      .collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`)
      .doc();
    writeBatch.set(docRef, question);
  });
  await writeBatch.commit();
}
