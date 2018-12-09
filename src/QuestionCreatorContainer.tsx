/* @flow */
import React, { useContext } from "react";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { QuestionCreator } from "./QuestionCreator";
import { FirebaseContext } from ".";
interface Props {
  gameId: string;
  category: ICategory;
}

export function QuestionCreatorContainer(props: Props) {
  const { gameId, category } = props;
  const { firestore } = useContext(FirebaseContext);
  const handleSubmitQuestion = (question: IQuestion) => {
    firestore.collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`).add({
      ...question
    });
  };

  return (
    <div>
      <QuestionCreator
        category={category}
        onSubmitQuestion={handleSubmitQuestion}
      />
    </div>
  );
}
