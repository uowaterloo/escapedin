import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import LockScreen from "./lock-screen";
import UnlockScreen from "./unlock-screen";
import { motion, AnimatePresence } from "framer-motion";

import { StateContext, ActionTypes } from "../../util/useApplicationState";

const MotionWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  & > * {
    grid-column: 1;
    grid-row: 1;
  }

  z-index: 100;
`;

export default function LockScreenIndex({ ...rest }) {
  const {
    state: { appState },
    dispatch,
  } = useContext(StateContext);

  return (
    <MotionWrapper
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      key="motion-wrapper"
    >
      <AnimatePresence>
        {appState === "LOCKSCREEN.UNLOCK" && (
          <UnlockScreen
            onSuccess={() => {
              console.log("unlocked");
              dispatch({ type: ActionTypes.unlocked });
              dispatch({ type: ActionTypes.setState, payload: "HOME" });
            }}
          />
        )}
      </AnimatePresence>

      <LockScreen
        onSwipeUp={() => {
          dispatch({
            type: ActionTypes.setState,
            payload: "LOCKSCREEN.UNLOCK",
          });
        }}
      />
    </MotionWrapper>
  );
}
