import React, { useContext } from "react";
import shortid from "shortid";
import { GameCreator } from "./GameCreator";
import { GAME_PATH } from "./firebasePaths";
import {
  loadInitialQuestionsToFirestore,
  loadInitialCategoriesToFirestore,
  createInitialCategories,
  createInitialQuestions
} from "./devQuestions";
import { FirebaseContext, GameboardSizeContext } from ".";

interface Props {
  onJoinGameAsHost: (gameId: string) => void;
}

export function GameCreatorContainer(props: Props) {
  const { onJoinGameAsHost } = props;
  const { firestore } = useContext(FirebaseContext);
  const { numberOfCategories, numberOfQuestions } = useContext(
    GameboardSizeContext
  );

  const handleGameCreation = async () => {
    const gameId = shortid.generate();
    const categories = createInitialCategories(numberOfCategories);
    const questions = createInitialQuestions(categories, numberOfQuestions);
    await firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: ""
      });

    onJoinGameAsHost(gameId);

    await Promise.all([
      loadInitialCategoriesToFirestore(firestore, gameId, categories),
      loadInitialQuestionsToFirestore(firestore, gameId, questions)
    ]);
  };

  return (
    <GameCreator
      onJoinGameAsHost={onJoinGameAsHost}
      onGameCreation={handleGameCreation}
    />
  );
}
