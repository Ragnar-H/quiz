import React, { useState, useContext } from "react";
import { GAME_PATH, CATEGORY_PATH, QUESTION_PATH } from "./firebasePaths";
import { Gameboard } from "./Gameboard";
import { useCollection } from "./useCollection";
import { FirebaseContext } from ".";

interface Props {
  gameId: string;
}

interface QuestionsState {
  questions: Array<IQuestion> | null;
  error: string | null;
  isLoading: boolean;
}

interface CategoryState {
  categories: Array<ICategory> | null;
  error: string | null;
  isLoading: boolean;
}
export function GameboardContainer(props: Props) {
  const { gameId } = props;
  const { firestore } = useContext(FirebaseContext);
  const categoryPath = `${GAME_PATH}${gameId}/${CATEGORY_PATH}`;
  const questionPath = `${GAME_PATH}${gameId}/${QUESTION_PATH}`;

  const [categoryState, setCategories] = useState<CategoryState>({
    categories: null,
    error: null,
    isLoading: true
  });

  const [questionsState, setQuestions] = useState<QuestionsState>({
    questions: null,
    error: null,
    isLoading: true
  });

  const mapSnapshotToQuestions = (
    snapshot: firebase.firestore.QuerySnapshot
  ) => {
    setQuestions({
      isLoading: false,
      error: null,
      questions: snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
    });
  };

  useCollection(questionPath, mapSnapshotToQuestions);
  const mapSnapshotToCategories = (
    snapshot: firebase.firestore.QuerySnapshot
  ) => {
    setCategories({
      isLoading: false,
      error: null,
      categories: snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
    });
  };

  const handleSetCurrentQuestion = (questionId: string) => {
    firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: questionId
      });
  };

  const handleSubmitQuestionEdit = (questionEdit: IQuestionEdit) => {
    const path = `${GAME_PATH}${gameId}/${QUESTION_PATH}`;
    firestore
      .collection(path)
      .doc(questionEdit.id)
      .set({
        text: questionEdit.text,
        answer: questionEdit.answer
      });
  };

  const handleSubmitCategoryEdit = (categoryEdit: ICategory) => {
    const path = `${GAME_PATH}${gameId}/${CATEGORY_PATH}`;
    firestore
      .collection(path)
      .doc(categoryEdit.id)
      .update({
        name: categoryEdit.name
      });
  };

  useCollection(categoryPath, mapSnapshotToCategories);

  return (
    <React.Fragment>
      {categoryState.isLoading ? (
        <p>Loading</p>
      ) : (
        categoryState.categories &&
        questionsState.questions && (
          <Gameboard
            editMode={true}
            onSetCurrentQuestion={handleSetCurrentQuestion}
            onSubmitQuestionEdit={handleSubmitQuestionEdit}
            onSubmitCategoryEdit={handleSubmitCategoryEdit}
            gameId={gameId}
            questions={questionsState.questions}
            categories={categoryState.categories}
          />
        )
      )}
    </React.Fragment>
  );
}
