import React, { useContext, useState } from "react";
import { GAME_PATH, QUESTION_PATH } from "./firebasePaths";
import { Question } from "./Question";
import { useCollection } from "./useCollection";
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
  const query = `${GAME_PATH}${gameId}/${QUESTION_PATH}`;

  const [questionState, setQuestions] = useState<State>({
    questions: [],
    error: null,
    isLoading: true
  });

  const mapSnapshotToQuestions = (
    snapshot: firebase.firestore.QuerySnapshot
  ) => {
    setQuestions({
      isLoading: false,
      error: null,
      questions: snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
    });
  };

  useCollection(query, mapSnapshotToQuestions);

  const handleSetCurrentQuestion = (questionId: string) => {
    firestore
      .collection(GAME_PATH)
      .doc(gameId)
      .set({
        currentQuestionId: questionId
      });
  };
  const handleOnQuestionEdit = (questionEdit: IQuestionEdit) => {
    console.log("submit this to firestore");
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
            onQuestionEdit={handleOnQuestionEdit}
          />
        ))
      )}
    </div>
  );
}
