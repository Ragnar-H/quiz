import { CATEGORY_PATH, GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { NUMBER_OF_QUESTIONS, NUMBER_OF_CATEGORIES } from ".";

const INITIAL_QUESTION_TEXT = "Fill in this question";
const INITIAL_ANSWER_TEXT = "Fill in the answer";
const QUESTION_POINT_ARRAY = [200, 400, 600, 800, 1000];

export const Categories = createInitialCategories(NUMBER_OF_CATEGORIES);
export const Questions = createInitialQuestions(
  Categories,
  NUMBER_OF_QUESTIONS
);

export async function loadInitialCategoriesToFirestore(
  firestore: firebase.firestore.Firestore,
  gameId: string,
  categories: Array<ICategory>
) {
  let writeBatch = firestore.batch();
  categories.forEach(category => {
    const docRef = firestore
      .collection(`${GAME_PATH}${gameId}/${CATEGORY_PATH}`)
      .doc(category.id);
    writeBatch.set(docRef, category);
  });
  await writeBatch.commit();
}

export async function loadInitialQuestionsToFirestore(
  firestore: firebase.firestore.Firestore,
  gameId: string,
  questions: Array<IQuestion>
) {
  let writeBatch = firestore.batch();

  questions.forEach(question => {
    const docRef = firestore
      .collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`)
      .doc(question.id);
    writeBatch.set(docRef, question);
  });
  await writeBatch.commit();
}

export function createInitialCategories(
  nrOfCategories: number
): Array<ICategory> {
  let categories = [];
  for (let i = 0; i < nrOfCategories; i++) {
    categories.push({ name: `Category ${i + 1}`, id: `category-${i}` });
  }
  return categories;
}

export function createInitialQuestions(
  categories: Array<ICategory>,
  nrOfQuestions: number
): Array<IQuestion> {
  let questions: Array<IQuestion> = [];
  categories.forEach(category => {
    for (let i = 0; i < nrOfQuestions; i++) {
      questions.push({
        text: INITIAL_QUESTION_TEXT,
        answer: INITIAL_ANSWER_TEXT,
        category: category.id,
        points: QUESTION_POINT_ARRAY[i],
        id: `${category.id}-question-${i}`,
        status: "unanswered"
      });
    }
  });
  return questions;
}
