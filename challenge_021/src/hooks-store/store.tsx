import { useState, useEffect, SetStateAction } from "react";
import { Product } from "../store/reducers/products";

export interface Actions<T> {
  [key: string]: (prevState: T, payload: any) => T;
}

export type Dispatch = (actionIdentifier: string, payload: any) => void;
export interface GlobalState {
  counter: number;
  products: Product[];
}

let globalState: GlobalState = {
  counter: 0,
  products: [],
};
let listeners: React.Dispatch<SetStateAction<any>>[] = [];
let actions: Actions<any> = {};

export const useStore = (shouldListen = true): [GlobalState, Dispatch] => {
  const setState = useState(globalState)[1];

  const dispatch: Dispatch = (actionIdentifier: string, payload: any) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions: Actions<any>, initialState: any) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
