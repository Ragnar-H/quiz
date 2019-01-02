import React, { useState, useContext } from "react";
import { GAME_PATH, CATEGORY_PATH, QUESTION_PATH } from "./firebasePaths";
import { Gameboard } from "./Gameboard";
import { useCollection } from "./useCollection";
import { FirebaseContext } from ".";
import { useDocument } from "./useDocument";
import { GameContext } from "./App";

interface Props {
  gameId: string;
}

interface CurrentQuestionState {
  currentQuestionId: string | null;
  error: string | null;
  isLoading: boolean;
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
  const { userAnsweringId, setUserAnsweringId } = useContext(GameContext);
  const gamePath = `${GAME_PATH}${gameId}`;
  const categoryPath = `${gamePath}/${CATEGORY_PATH}`;
  const questionPath = `${gamePath}/${QUESTION_PATH}`;

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

  const [currentQuestionState, setCurrentQuestion] = useState<
    CurrentQuestionState
  >({
    currentQuestionId: null,
    error: null,
    isLoading: true
  });

  const mapSnapshotToCurrentQuestion = (
    snapshot: firebase.firestore.DocumentSnapshot
  ) => {
    const currentQuestionId = snapshot.get("currentQuestionId");
    setCurrentQuestion({
      currentQuestionId,
      error: null,
      isLoading: false
    });
  };

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

  const handleSetCurrentQuestion = (questionId: string | null) => {
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
      .update({
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

  useCollection(questionPath, mapSnapshotToQuestions);
  useCollection(categoryPath, mapSnapshotToCategories);
  useDocument(gamePath, mapSnapshotToCurrentQuestion);

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
            currentQuestionId={currentQuestionState.currentQuestionId}
            gameId={gameId}
            questions={questionsState.questions}
            categories={categoryState.categories}
            buzzes={[]}
            currentAnsweringId={userAnsweringId}
            onSetCurrentAnsweringId={setUserAnsweringId}
          />
        )
      )}
    </React.Fragment>
  );
}
