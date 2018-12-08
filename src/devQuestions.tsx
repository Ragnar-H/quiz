/* @flow */
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";

export const CATEGORIES = [
  { name: "Leo", id: "category-0" },
  { name: "Technology", id: "category-1" },
  { name: "Famous people", id: "category-2" },
  { name: "Innovation", id: "category-3" },
  { name: "Random", id: "category-4" },
  { name: "Spinoffs", id: "category-5" }
];

export const Questions: Array<IQuestion> = [
  {
    text: "Potato",
    answer: "What is amazing food?",
    category: CATEGORIES[0],
    points: 500,
    id: "123"
  },
  {
    text: "Lion",
    answer: "What is the Leo Pharma logo?",
    category: CATEGORIES[0],
    points: 300,
    id: "124"
  },
  {
    text: "Apple and NewSec",
    answer: "Who are our neighbours?",
    category: CATEGORIES[1],
    points: 300,
    id: "125"
  },
  {
    text: "Illum",
    answer: "Who lives above us?",
    category: CATEGORIES[1],
    points: 700,
    id: "126"
  },
  {
    text: "Matt Avis",
    answer: "Who is the reigning Ping Pong champion?",
    category: CATEGORIES[4],
    points: 300,
    id: "127"
  },
  {
    text: "Silkegade 8",
    answer: "What is the address of our office?",
    category: CATEGORIES[3],
    points: 300,
    id: "128"
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
