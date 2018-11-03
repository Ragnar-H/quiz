/* @flow */
import React, { Component } from "react";
import { FirestoreCollection } from "react-firestore";
import { QUESTION_PATH, GAME_PATH } from "./firebasePaths";
import { BuzzList } from "./BuzzList";
import { GameContext } from "./App";

interface Props {
  questionId: string;
  gameId: string;
}

export class BuzzListContainer extends Component<Props> {
  render() {
    const { questionId, gameId } = this.props;
    return (
      <FirestoreCollection
        path={`${GAME_PATH}${gameId}/${QUESTION_PATH}${questionId}/buzzes`}
        sort="timestamp:asc"
        render={({ isLoading, data }: FirestoreRenderProps) => {
          return isLoading ? (
            <p>Loading</p>
          ) : (
            <GameContext.Consumer>
              {({ userAnsweringId, setUserAnsweringId }) => (
                <BuzzList
                  currentAnsweringId={userAnsweringId}
                  onSetCurrentAnsweringId={setUserAnsweringId}
                  buzzes={data}
                />
              )}
            </GameContext.Consumer>
          );
        }}
      />
    );
  }
}
