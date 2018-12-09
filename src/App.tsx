/* @flow */
import React, { Component } from "react";
import "./App.css";
import { PlayersContainer } from "./PlayersContainer";
import SignUpContainer from "./SignUpContainer";
import { PlayerProfile } from "./PlayerProfile";
import { CurrentQuestionContainer } from "./CurrentQuestionContainer";
import { GameCreatorContainer } from "./GameCreatorContainer";
import QuestionCreatorContainer from "./QuestionCreatorContainer";
import QuestionsContainer from "./QuestionsContainer";
import { CurrentAnsweringUser } from "./CurrentAnsweringUser";

export type Roles = "host" | "player";

interface IUserContext {
  username: string | null;
  userId: string | null;
  role: Roles | null;
}

export const UserContext = React.createContext<IUserContext>({
  username: null,
  userId: null,
  role: null
});

interface IGameContext {
  gameId: string | null;
  userAnsweringId: string | null;
  setUserAnsweringId: (userId: string) => void;
}

export const GameContext = React.createContext<IGameContext>({
  gameId: null,
  userAnsweringId: null,
  setUserAnsweringId: (userId: string) => {}
});

interface Props {}
interface State {
  username: string | null;
  userId: string | null;
  role: Roles | null;
  gameId: string | null;
  userAnsweringId: string | null;
  setUserAnsweringId: (userId: string) => void;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: null,
      userId: null,
      role: null,
      gameId: null,
      userAnsweringId: null,
      setUserAnsweringId: this.setUserAnswering
    };
  }
  handleJoinGame = (
    name: string,
    userId: string,
    role: Roles,
    gameId: string
  ) => {
    this.setState(state => ({
      username: name,
      userId,
      role,
      gameId
    }));
  };

  setGame = (gameId: string, role: Roles) => {
    this.setState(state => ({
      gameId,
      role
    }));
  };

  setUserAnswering = (userId: string) => {
    this.setState({
      userAnsweringId: userId
    });
  };

  render() {
    const { gameId, username, role, userAnsweringId } = this.state;
    const isHost = role === "host";
    return (
      <GameContext.Provider value={this.state}>
        <div className="App">
          <GameCreatorContainer
            onJoinGameAsHost={(gameId: string) => this.setGame(gameId, "host")}
          />
          <SignUpContainer
            onJoinGame={(username: string, userId: string, gameId: string) =>
              this.handleJoinGame(username, userId, "player", gameId)
            }
          />

          {gameId && (
            <UserContext.Provider value={this.state}>
              <h1>GameId : {gameId}</h1>

              {isHost && (
                <QuestionCreatorContainer
                  gameId={gameId}
                  category={{ name: "Leo internals", id: "some-id" }}
                />
              )}

              {isHost && <QuestionsContainer gameId={gameId} />}

              <PlayersContainer gameId={gameId} />

              {username && (
                <React.Fragment>
                  <h1>PlayerProfile</h1>
                  <PlayerProfile />
                </React.Fragment>
              )}
              <h1>Current Question</h1>
              <CurrentQuestionContainer gameId={gameId} />
              {userAnsweringId && (
                <CurrentAnsweringUser userId={userAnsweringId} />
              )}
            </UserContext.Provider>
          )}
        </div>
      </GameContext.Provider>
    );
  }
}

export default App;
