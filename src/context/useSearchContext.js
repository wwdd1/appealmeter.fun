'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
} from "react";

const SearchContext = createContext(null);

export function SearchContextProvider({ children }) {
  const [filters, setFiltersDispatch] = useState({
    query: null,
  });

  const setFilters = useCallback(({ query }) => {
    const newFilters = {
      query: null,
    };
    if (query) {
      newFilters.query = query;
    }
    setFiltersDispatch(newFilters);
  }, [filters]);

  return (
    <SearchContext.Provider value={{
      filters,
      setFilters,
    }}>
      { children }
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error('Component needs to be wrapped by SearchContext.Provider');
  }

  return searchContext;
}
