import React from "react";
import styles from "./ScoreList.module.css";

interface Props {
  players: IPlayer[];
}

export function ScoreList(props: Props) {
  return (
    <div className={styles.scoreList}>
      {props.players.map(player => (
        <div key={player.id} className={styles.scoreItem}>
          <p>{player.score || 0}</p>
          <p>{player.username}</p>
        </div>
      ))}
    </div>
  );
}
