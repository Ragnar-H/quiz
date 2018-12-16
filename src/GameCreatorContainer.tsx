import React, { useContext } from "react";
import shortid from "shortid";
import { GameCreator } from "./GameCreator";
import { GAME_PATH } from "./firebasePaths";
import {
  loadInitialQuestionsToFirestore,
  loadInitialCategoriesToFirestore
} from "./devQuestions";
import { FirebaseContext } from ".";

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

    await Promise.all([
      loadInitialCategoriesToFirestore(firestore, gameId),
      loadInitialQuestionsToFirestore(firestore, gameId)
    ]);
  };

  return (
    <GameCreator
      onJoinGameAsHost={onJoinGameAsHost}
      onGameCreation={handleGameCreation}
    />
  );
}
