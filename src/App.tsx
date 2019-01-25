import React, { Component } from "react";
import "./App.css";
import { SignUpContainer } from "./SignUpContainer";
import { GameCreatorContainer } from "./GameCreatorContainer";
import { GameboardContainer } from "./GameboardContainer";
import { BuzzerContainer } from "./BuzzerContainer";

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
    const { gameId, role } = this.state;
    const isHost = role === "host";
    const isPlayer = role === "player";
    return (
      <GameContext.Provider value={this.state}>
        <div className="App">
          {!gameId ? (
            <div>
              <GameCreatorContainer
                onJoinGameAsHost={(gameId: string) =>
                  this.setGame(gameId, "host")
                }
              />
              <SignUpContainer
                onJoinGame={(
                  username: string,
                  userId: string,
                  gameId: string
                ) => this.handleJoinGame(username, userId, "player", gameId)}
              />
            </div>
          ) : (
            <UserContext.Provider value={this.state}>
              {isHost && <GameboardContainer gameId={gameId} />}
              {isPlayer && <BuzzerContainer gameId={gameId} />}
            </UserContext.Provider>
          )}
        </div>
      </GameContext.Provider>
    );
  }
}

export default App;
