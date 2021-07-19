import { createContext, useContext, useReducer } from "react";

export type StoreContext = ReturnType<typeof useStoreValue>;

export type StoreState = typeof initialState;

export type StoreAction = {
  type: string;
  payload?: unknown;
};

const StoreContext = createContext<StoreContext | undefined>(undefined);
StoreContext.displayName = "StoreContext";

const initialState = {};

function reducer(state: StoreState, action: StoreAction) {
  switch (action.type) {
    default:
      return state;
  }
}

function useStoreValue() {
  return useReducer(reducer, initialState);
}

export function useStore() {
  const value = useContext(StoreContext);
  if (value === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return value;
}

export function StoreProvider<T>(props: T) {
  const value = useStoreValue();
  return <StoreContext.Provider value={value} {...props} />;
}
