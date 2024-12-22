'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
} from "react";

const collection = {
  questions: [],
  setQuestions: undefined,
};

const CollectionContext = createContext(collection);

export function CollectionContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  const addQuestion = useCallback((question) => {
    const questionIndex = questions.findIndex(
      q => q.id === question.id
    )
    if (questionIndex === -1) {
      setQuestions([...questions, question]);
    }
  }, [questions]);

  return (
    <CollectionContext.Provider value={{ questions, addQuestion }}>
      { children }
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  const collectionContext = useContext(CollectionContext);
  if (!collectionContext) {
    throw new Error('Component needs to be wrapped by CollectionContext.Provider');
  }

  return collectionContext;
}


