import React, { useContext, useRef, useEffect, useState } from "react";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { FirebaseContext } from ".";

interface Props {
  questionId: string;
  gameId: string;
}

interface State {
  question: IQuestion | null;
  error: string | null;
  isLoading: boolean;
}

export function useDocument(
  query: string,
  callback: (value: firebase.firestore.DocumentSnapshot) => void
) {
  const { firestore } = useContext(FirebaseContext);
  const queryPath = useRef(query);
  if (queryPath.current !== query) {
    queryPath.current = query;
  }
  useEffect(
    () => {
      const unsubscribe = firestore.doc(query).onSnapshot(callback);

      return () => {
        unsubscribe();
      };
    },
    [queryPath]
  );
}

export function QuestionContainer(props: Props) {
  const { questionId, gameId } = props;
  const query = `${GAME_PATH}${gameId}/${QUESTION_PATH}${questionId}`;

  const [questionState, setQuestion] = useState<State>({
    question: null,
    error: null,
    isLoading: true
  });

  const mapSnapshotToQuestion = (
    snapshot: firebase.firestore.DocumentSnapshot | any
  ) => {
    setQuestion({
      isLoading: false,
      error: null,
      question: {
        id: snapshot.id,
        ...snapshot.data()
      }
    });
  };

  useDocument(query, mapSnapshotToQuestion);
  return (
    <div>
      {questionState.isLoading ? (
        <p>Loading</p>
      ) : (
        questionState.question && (
          <div>
            <p>Question: {questionState.question.text}</p>
            <p>Answer: {questionState.question.answer}</p>
          </div>
        )
      )}
    </div>
  );
}
