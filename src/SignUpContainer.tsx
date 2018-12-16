import React, { useContext } from "react";
import { SignUp } from "./SignUp";
import { GAME_PATH, PLAYER_PATH } from "./firebasePaths";
import { FirebaseContext } from ".";

interface Props {
  onJoinGame: (username: string, userId: string, gameId: string) => void;
}

export function SignUpContainer(props: Props) {
  const { onJoinGame } = props;
  const { firestore } = useContext(FirebaseContext);

  const handleSubmitUser = async (username: string, gameId: string) => {
    const userDoc = await firestore
      .collection(`${GAME_PATH}${gameId}/${PLAYER_PATH}`)
      .add({
        username
      });

    onJoinGame(username, userDoc.id, gameId);
  };

  return (
    <div>
      <SignUp submitUser={handleSubmitUser} />
    </div>
  );
}
