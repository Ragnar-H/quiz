import React from "react";
import styles from "./ScoreList.module.css";

interface Props {
  players: IPlayer[];
}

export function ScoreList(props: Props) {
  return (
    <div className={styles.scoreList}>
      {props.players.map(player => (
        <div className={styles.scoreItem}>
          <p>{player.score}</p>
          <p>{player.username}</p>
        </div>
      ))}
    </div>
  );
}
