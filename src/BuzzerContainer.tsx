import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { FirebaseContext } from ".";
import { UserContext } from "./App";
import { useDocument } from "./useDocument";

interface Props {
  gameId: string;
}

interface CurrentQuestionState {
  currentQuestionId: string | null;
  error: string | null;
  isLoading: boolean;
}
export function BuzzerContainer(props: Props) {
  const { gameId } = props;
  const { firestore } = useContext(FirebaseContext);
  const { username, userId } = useContext(UserContext);
  const gamePath = `${GAME_PATH}${gameId}`;

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

  useDocument(gamePath, mapSnapshotToCurrentQuestion);
  const handleBuzz = () => {
    if (!currentQuestionState.currentQuestionId) {
      throw new Error("Buzz without a question");
    }
    firestore
      .collection(
        `${GAME_PATH}${gameId}/${QUESTION_PATH}${
          currentQuestionState.currentQuestionId
        }/buzzes`
      )
      .add({
        username,
        userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
  return (
    <div>
      <button
        onClick={handleBuzz}
        disabled={!currentQuestionState.currentQuestionId}
      >
        Buzz!
      </button>
    </div>
  );
}
