/* @flow */
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";

export const Questions = [
  {
    question: "Lion",
    answer: "What is the Leo Pharma logo?"
  },
  {
    question: "Apple and NewSec",
    answer: "Who are our neighbours?"
  },
  {
    question: "Matt Avis",
    answer: "Who is the reigning Ping Pong champion?"
  },
  {
    question: "Silkegade 8",
    answer: "What is the address of our office?"
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
