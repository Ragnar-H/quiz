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

  useCollection(playerPath, mapSnapshotToPlayers, undefined);
  useCollection(questionPath, mapSnapshotToQuestions, undefined);
  useCollection(categoryPath, mapSnapshotToCategories, undefined);
  useDocument(gamePath, mapSnapshotToCurrentQuestion);

  let buzzesPath: string | null = null;
  if (currentQuestionState.currentQuestionId) {
    buzzesPath = `${GAME_PATH}${gameId}/${QUESTION_PATH}${
      currentQuestionState.currentQuestionId
    }/buzzes`;
  }
  useCollection(buzzesPath, mapSnapshotToBuzzes, {
    property: "deleted",
    operator: "==",
    value: false
  });

  const sumPoints = async ({
    userId,
    buzzId,
    positive
  }: {
    userId: string;
    buzzId: string;
    positive: boolean;
  }) => {
    if (!currentQuestionState.currentQuestionId) {
      throw new Error("Trying to give points without a question");
    }
    if (!questionsState.questions) {
      throw new Error("Trying to give points without a list of questions");
    }
    if (!buzzesPath) {
      throw new Error("Trying to give points without buzz path");
    }

    const currentQuestion = questionsState.questions.find(
      question => question.id === currentQuestionState.currentQuestionId
    );

    if (!currentQuestion) {
      throw new Error("Trying to give points to question that is not found");
    }

    const userDocRef = firestore.collection(playerPath).doc(userId);
    const currentUserBuzzesRef = firestore.collection(buzzesPath).doc(buzzId);

    await firestore.runTransaction(transaction => {
      return Promise.all([
        transaction.get(userDocRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
            throw "Document does not exist!";
          }

          const currentPlayerData = sfDoc.data();
          const currentScore =
            (currentPlayerData && currentPlayerData.score) || 0;
          const scoreDiff = currentQuestion.points * (positive ? 1 : -1);
          var newScore = currentScore + scoreDiff;
          transaction.update(userDocRef, { score: newScore });
        }),
        transaction.update(currentUserBuzzesRef, { deleted: true })
      ]);
    });
  };

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
            onCorrectAnswer={(userId: string, buzzId: string) =>
              sumPoints({ userId, buzzId, positive: true })
            }
            onWrongAnswer={(userId: string, buzzId: string) =>
              sumPoints({ userId, buzzId, positive: false })
            }
          />
        )
      )}
    </React.Fragment>
  );
}
