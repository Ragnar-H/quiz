import React, { useContext, useEffect, useState, useRef } from "react";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { Question } from "./Question";
import { FirebaseContext } from ".";

interface Props {
  gameId: string;
}

interface State {
  questions: Array<IQuestion>;
  error: string | null;
  isLoading: boolean;
}

export function QuestionsContainer(props: Props) {
  const { gameId } = props;
  const { firestore } = useContext(FirebaseContext);

  const [questionState, setQuestions] = useState<State>({
    questions: [],
    error: null,
    isLoading: true
  });

  const listenerRef = useRef<boolean>(false);

  useEffect(
    () => {
      const unsubscribe = firestore
        .collection(`${GAME_PATH}${gameId}/${QUESTION_PATH}`)
        .onSnapshot(snapshot => {
          setQuestions({
            questions: snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data()
            })),
            isLoading: false,
            error: null
          });
        });

      listenerRef.current = true;

      return () => {
        unsubscribe();
      };
    },
    [listenerRef.current]
  );

  const handleSetCurrentQuestion = (questionId: string) => {
    firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: questionId
      });
  };

  return (
    <div>
      {questionState.isLoading ? (
        <p>Loading</p>
      ) : (
        questionState.questions.map((question: IQuestion) => (
          <Question
            mode="unanswered"
            key={question.id}
            questionId={question.id}
            questionText={question.text}
            answer={question.answer}
            points={question.points}
            onQuestionClick={handleSetCurrentQuestion}
          />
        ))
      )}
    </div>
  );
}
