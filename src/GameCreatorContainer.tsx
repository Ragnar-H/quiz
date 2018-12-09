/* @flow */
import React, { useContext } from "react";
import shortid from "shortid";
import { GameCreator } from "./GameCreator";
import { GAME_PATH } from "./firebasePaths";
import { loadStaticQuestionsToFirestore } from "./devQuestions";
import { FirebaseContext } from ".";
// 1. Get this component to work with hooks
// 2. Generalize and pull into custom Hook
// 3. Profit

interface Props {
  onJoinGameAsHost: (gameId: string) => void;
}

export function GameCreatorContainer(props: Props) {
  const { onJoinGameAsHost } = props;
  const { firestore } = useContext(FirebaseContext);

  const handleGameCreation = async () => {
    const gameId = shortid.generate();
    await firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: ""
      });

    onJoinGameAsHost(gameId);

    await loadStaticQuestionsToFirestore(firestore, gameId);
  };

  return (
    <GameCreator
      onJoinGameAsHost={onJoinGameAsHost}
      onGameCreation={handleGameCreation}
    />
  );
}
