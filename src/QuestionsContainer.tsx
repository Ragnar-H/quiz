/* @flow */
import React, { useContext } from "react";
import { FirestoreCollection } from "react-firestore";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { Question } from "./Question";
import { FirebaseContext } from ".";

interface Props {
  gameId: string;
}

export function QuestionsContainer(props: Props) {
  const { gameId } = props;
  const { firestore } = useContext(FirebaseContext);

  const handleSetCurrentQuestion = (questionId: string) => {
    firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: questionId
      });
  };

  return (
    <FirestoreCollection
      path={`${GAME_PATH}${gameId}/${QUESTION_PATH}`}
      render={({ isLoading, data }: FirestoreRenderProps) => {
        return isLoading ? (
          <p>Loading</p>
        ) : (
          <div>
            <h1>List of questions</h1>
            {data.map((question: IQuestion) => (
              <Question
                mode="unanswered"
                key={question.id}
                questionId={question.id}
                questionText={question.text}
                answer={question.answer}
                points={question.points}
                onQuestionClick={handleSetCurrentQuestion}
              />
            ))}
          </div>
        );
      }}
    />
  );
}
