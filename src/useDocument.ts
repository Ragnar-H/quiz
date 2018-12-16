import { useContext, useRef, useEffect } from "react";
import { FirebaseContext } from ".";

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
    [queryPath.current]
  );
}
