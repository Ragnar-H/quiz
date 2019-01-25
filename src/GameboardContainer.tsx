import React, { useState, useContext } from "react";
import {
  GAME_PATH,
  CATEGORY_PATH,
  QUESTION_PATH,
  PLAYER_PATH
} from "./firebasePaths";
import { Gameboard } from "./Gameboard";
import { useCollection } from "./useCollection";
import { FirebaseContext } from ".";
import { useDocument } from "./useDocument";
import { GameContext } from "./App";

interface Props {
  gameId: string;
}

interface BuzzesState {
  buzzes: Array<IBuzz> | null;
  error: string | null;
  isLoading: boolean;
}

interface PlayersState {
  players: Array<IPlayer> | null;
  error: string | null;
  isLoading: boolean;
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
  const playerPath = `${gamePath}/${PLAYER_PATH}`;

  const [buzzesState, setBuzzes] = useState<BuzzesState>({
    buzzes: null,
    error: null,
    isLoading: false
  });

  const [playersState, setPlayers] = useState<PlayersState>({
    players: null,
    error: null,
    isLoading: true
  });

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

  const mapSnapshotToPlayers = (snapshot: firebase.firestore.QuerySnapshot) => {
    setPlayers({
      isLoading: false,
      error: null,
      players: snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
    });
  };

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

  const mapSnapshotToBuzzes = (snapshot: firebase.firestore.QuerySnapshot) => {
    setBuzzes({
      isLoading: false,
      error: null,
      buzzes: snapshot.docs.map((doc: any) => ({
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

  useCollection(playerPath, mapSnapshotToPlayers);
  useCollection(questionPath, mapSnapshotToQuestions);
  useCollection(categoryPath, mapSnapshotToCategories);
  useDocument(gamePath, mapSnapshotToCurrentQuestion);

  let buzzesPath = null;
  if (currentQuestionState.currentQuestionId) {
    buzzesPath = `${GAME_PATH}${gameId}/${QUESTION_PATH}${
      currentQuestionState.currentQuestionId
    }/buzzes`;
  }

  useCollection(buzzesPath, mapSnapshotToBuzzes);
  return (
    <React.Fragment>
      {categoryState.isLoading ? (
        <p>Loading</p>
      ) : (
        categoryState.categories &&
        questionsState.questions &&
        playersState.players && (
          <Gameboard
            editMode={true}
            onSetCurrentQuestion={handleSetCurrentQuestion}
            onSubmitQuestionEdit={handleSubmitQuestionEdit}
            onSubmitCategoryEdit={handleSubmitCategoryEdit}
            currentQuestionId={currentQuestionState.currentQuestionId}
            gameId={gameId}
            questions={questionsState.questions}
            players={playersState.players}
            categories={categoryState.categories}
            buzzes={buzzesState.buzzes}
            currentAnsweringId={userAnsweringId}
            onSetCurrentAnsweringId={setUserAnsweringId}
            onCorrectAnswer={userId => console.log("got correct", { userId })}
            onWrongAnswer={userId => console.log("got wrong", { userId })}
          />
        )
      )}
    </React.Fragment>
  );
}
