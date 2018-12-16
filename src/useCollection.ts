import { useEffect, useRef, useContext } from "react";
import { FirebaseContext } from ".";

export function useCollection(
  query: string,
  callback: (value: firebase.firestore.QuerySnapshot) => void
) {
  const { firestore } = useContext(FirebaseContext);
  const queryPath = useRef(query);
  if (queryPath.current !== query) {
    queryPath.current = query;
  }
  useEffect(
    () => {
      const unsubscribe = firestore.collection(query).onSnapshot(callback);

      return () => {
        unsubscribe();
      };
    },
    [queryPath.current]
  );
}
