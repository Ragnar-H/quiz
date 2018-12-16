import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";

const INITIAL_QUESTION_TEXT = "Fill in this question";
const INITIAL_ANSWER_TEXT = "Fill in the answer";
const QUESTION_POINT_ARRAY = [200, 400, 600, 800, 1000];

export const Categories = createInitialCategories(6);
export const Questions = createInitialQuestions(Categories, 5);

export async function loadStaticQuestionsToFirestore(
  firestore: any,
  gameId: string
) {
  let writeBatch = firestore.batch();

  Questions.forEach(question => {
    const docRef = firestore
      .collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`)
      .doc(question.id);
    writeBatch.set(docRef, question);
  });
  await writeBatch.commit();
}

function createInitialCategories(nrOfCategories: number): Array<ICategory> {
  let categories = [];
  for (let i = 0; i < nrOfCategories; i++) {
    categories.push({ name: `Category ${i + 1}`, id: `category-${i}` });
  }
  return categories;
}

function createInitialQuestions(
  categories: Array<ICategory>,
  nrOfQuestions: number
): Array<IQuestion> {
  let questions: Array<IQuestion> = [];
  categories.forEach(category => {
    for (let i = 0; i < nrOfQuestions; i++) {
      questions.push({
        text: INITIAL_QUESTION_TEXT,
        answer: INITIAL_ANSWER_TEXT,
        category: category,
        points: QUESTION_POINT_ARRAY[i],
        id: `${category.name}-question-${i}`
      });
    }
  });
  return questions;
}
