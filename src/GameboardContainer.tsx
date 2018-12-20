import React, { useState } from "react";
import { GAME_PATH, CATEGORY_PATH, QUESTION_PATH } from "./firebasePaths";
import { Gameboard } from "./Gameboard";
import { useCollection } from "./useCollection";

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
            onSetCurrentQuestion={questionId => {
              console.log("setting current question", questionId);
            }}
            onSubmitQuestionEdit={(questionEdit: IQuestionEdit) => {
              console.log("submitting question edits", questionEdit);
            }}
            gameId={gameId}
            questions={questionsState.questions}
            categories={categoryState.categories}
          />
        )
      )}
    </React.Fragment>
  );
}
