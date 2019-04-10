import { useReducer, Reducer } from "react";

type AddAction<T> = {
  type: "PUSH";
  payload: {
    item: T;
  };
};

type RemoveAction = {
  type: "REMOVE";
  payload: {
    index: number;
  };
};

type Action<T> = AddAction<T> | RemoveAction;

const reducer = <T>(state: T[], action: Action<T>): T[] => {
  switch (action.type) {
    case "PUSH": {
      return [...state, action.payload.item];
    }
    case "REMOVE": {
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1)
      ];
    }
    default: {
      return [];
    }
  }
};

const addAction = <T>(item: T): AddAction<T> => ({
  type: "PUSH",
  payload: {
    item
  }
});
const removeAction = (index: number): RemoveAction => ({
  type: "REMOVE",
  payload: {
    index
  }
});

const bind = <T extends any[], U>(
  action: (...args: T) => U,
  dispatch: (action: U) => void
) => (...args: T) => dispatch(action(...args));

const useArray = <T>(init: T[] = []) => {
  const [state, dispatch] = useReducer<Reducer<T[], Action<T>>>(reducer, init);
  const add = bind(addAction, dispatch);
  const remove = bind(removeAction, dispatch);
  return [state, add, remove] as [typeof state, typeof add, typeof remove];
};

export { useArray };
