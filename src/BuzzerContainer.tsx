import React, { useContext } from "react";
import firebase from "firebase/app";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { FirebaseContext } from ".";

interface Props {
  questionId: string;
  username: string;
  userId: string;
  gameId: string;
}

export function BuzzerContainer(props: Props) {
  const { questionId, username, userId, gameId } = props;
  const { firestore } = useContext(FirebaseContext);
  const handleBuzz = () => {
    firestore
      .collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}${questionId}/buzzes`)
      .add({
        username,
        userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
  return (
    <div>
      <button onClick={handleBuzz}>Buzz!</button>
    </div>
  );
}
