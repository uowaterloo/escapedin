import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const ActionTypes = {
  unlocked: "UNLOCKED",
  setState: "SET_STATE",
  completePuzzle: "COMPLETE_PUZZLE",
  reset: "RESET",
  updateAll: "UPDATE_ALL",
};

//States: ['INTRO', 'HIDDEN', 'MAP', 'LOCKSCREEN', 'LOCKSCREEN.UNLOCK', 'HOME', 'PLAYER', 'TINDAWG', 'SLACK', 'PHONE', 'PETWALL', 'FANTASYWALL']

const initialState = {
  unlocked: false,
  appState: "INTRO",
  completedPuzzles: [],
};

export const StateContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.unlocked:
      return {
        ...state,
        unlocked: true,
      };
    case ActionTypes.setState:
      console.log(`State change: ${action.payload}`);

      return {
        ...state,
        appState: action.payload,
      };
    case ActionTypes.completePuzzle:
      return {
        ...state,
        completedPuzzles: [...state.completedPuzzles, action.payload],
      };
    case ActionTypes.reset:
      return initialState;
    case ActionTypes.updateAll:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

const statefulReducer = (state, action) => {
  const newState = reducer(state, action);

  localStorage.setItem("escapedin-state", JSON.stringify(newState));

  return newState;
};

const useApplicationState = () => {
  const [state, dispatch] = useReducer(statefulReducer, initialState);
  const history = useHistory();

  useEffect(async () => {
    const savedState = localStorage.getItem("escapedin-state");
    if (savedState) {
      try {
        const parsedState = await JSON.parse(savedState);

        if (
          parsedState.completedPuzzles.includes("KIOSK") &&
          history.location.pathname === "/"
        ) {
          history.push("/outside_office");
        }

        dispatch({
          type: ActionTypes.updateAll,
          payload: parsedState,
        });
      } catch {
        console.error("error parsing game state");
      }
    }
  }, []);

  return { state, dispatch };
};

export default useApplicationState;
