/* @flow */
import React, { Component } from "react";
import { FirestoreDocument } from "react-firestore";
import { QuestionContainer } from "./QuestionContainer";
import { BuzzListContainer } from "./BuzzListContainer";
import { BuzzerContainer } from "./BuzzerContainer";
import { UserContext } from "./App";
import { GAME_PATH } from "./firebasePaths";

interface Props {
  gameId: string;
}

interface State {
  currentQuestionId: string | null;
}

export class CurrentQuestionContainer extends Component<Props, State> {
  state = {
    currentQuestionId: null
  };

  render() {
    const { gameId } = this.props;
    return (
      <FirestoreDocument
        path={`${GAME_PATH}${gameId}`}
        render={({ isLoading, data }: FirestoreRenderProps) => {
          return isLoading ? (
            <p>Loading</p>
          ) : (
            <div>
              {data &&
                data.currentQuestionId && (
                  <React.Fragment>
                    <QuestionContainer
                      questionId={data.currentQuestionId}
                      gameId={gameId}
                    />
                    <h1>Buzzes</h1>
                    <UserContext.Consumer>
                      {({ username, userId, role }) => (
                        <React.Fragment>
                          {role === "player" &&
                            username != null &&
                            userId != null && (
                              <BuzzerContainer
                                username={username}
                                userId={userId}
                                questionId={data.currentQuestionId}
                                gameId={gameId}
                              />
                            )}
                        </React.Fragment>
                      )}
                    </UserContext.Consumer>
                    <BuzzListContainer
                      questionId={data.currentQuestionId}
                      gameId={gameId}
                    />
                  </React.Fragment>
                )}
            </div>
          );
        }}
      />
    );
  }
}
