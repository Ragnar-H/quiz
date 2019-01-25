import { useEffect, useRef, useContext } from "react";
import { FirebaseContext } from ".";

export function useCollection(
  query: string | null,
  callback: (value: firebase.firestore.QuerySnapshot) => void,
  filter:
    | { property: string; operator: ">" | "<" | "=="; value: any }
    | undefined
) {
  const { firestore } = useContext(FirebaseContext);
  const queryPath = useRef(query);
  if (queryPath.current !== query) {
    queryPath.current = query;
  }
  useEffect(
    () => {
      if (query === null) {
        return; //We're unsubscribing
      }
      const unsubscribe = filter
        ? firestore
            .collection(query)
            .where(filter.property, filter.operator, filter.value)
            .onSnapshot(callback)
        : firestore.collection(query).onSnapshot(callback);

      return () => {
        unsubscribe();
      };
    },
    [queryPath.current]
  );
}
