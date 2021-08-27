import React from "react";
import styled from "styled-components";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import PhoneRouter from "./app-router";
import LocationRouter from "./panel-router";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdRefresh } from "react-icons/io";
import Button from "../shared/button";
import { useHistory } from "react-router-dom";

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(275px, 35%) 1fr;
  grid-template-rows: 64px 1fr;
  max-height: 100vh;
  height: 100vh;
  /*background-color: #fee140;
  background-image: linear-gradient(90deg, #fee140 0%, #fa709a 100%);*/

  background-image: url("/ui/wood_01.jpg");
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const DeviceOuterContainer = styled.div`
  overflow: hidden;
  align-self: center;
  justify-self: center;

  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};

  width: 95%;
  max-width: 375px;
  min-height: 300px;
  height: 80vh;
  max-height: 750px;
  display: flex;
  flex-direction: column;
  border: 16px solid #000;
  background-color: #000;
  border-radius: 24px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);

  grid-row: 2;
  grid-column: 1;
`;

const DeviceContainer = styled.div`
  flex-grow: 1;
  width: 100%;

  background-color: #2e2e2e;
  overflow: hidden;
  border-radius: 8px;

  display: grid;

  & > * {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    grid-column: 1;
    grid-row: 1;
  }
`;

const HomeButtonContainer = styled.div`
  width: 100%;

  background-color: #000;

  display: flex;
  justify-content: center;
  padding: 16px 0 0 0;
  grid-column: 1;
`;

const HomeButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ::after {
    display: block;
    content: "";
    width: 2.5vh;
    height: 2.5vh;
    border: 2px solid #fff;
    border-radius: 20%;
  }
`;

const Header = styled.div`
  padding: 12px 16px;
  color: #fff;
  background: rgba(0, 0, 0);
  grid-column: span 2;
  align-self: start;
  display: flex;
  align-items: stretch;
  max-height: 100%;
  justify-content: space-between;

  grid-row: 1;
  grid-column: 1 / -1;

  & > img {
    object-fit: contain;
    object-position: left;
  }
`;

const RightPanel = styled.div`
  width: 100%;
  height: 100%;

  padding: 8px;
  display: grid;
  place-items: center;
  background-color: #ffffff;
  background-image: url("https://www.transparenttextures.com/patterns/brick-wall.png");
  border-left: 6px solid #000;
  grid-column: 2;
  grid-row: 2;
`;

const SplashScreenContainer = styled(motion.div)`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 1000;
  overflow: hidden;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

function App({ children }) {
  const {
    state: { appState },
    dispatch,
  } = React.useContext(StateContext);

  const history = useHistory();

  const goHome = () => {
    const destination =
      appState === "LOCKSCREEN"
        ? "LOCKSCREEN.UNLOCK"
        : appState === "LOCKSCREEN.UNLOCK"
        ? "LOCKSCREEN"
        : "HOME";

    dispatch({ type: ActionTypes.setState, payload: destination });
  };

  const reset = () => {
    if (
      window.confirm("Are you sure you want to clear all progress and reset?")
    ) {
      history.push("/");
      dispatch({ type: ActionTypes.reset });
    }
  };

  return (
    <PageContainer>
      <AnimatePresence>
        {appState === "INTRO" ? (
          <SplashScreenContainer
            initial={{ opacity: 1, y: "0" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            onClick={() =>
              dispatch({ type: ActionTypes.setState, payload: "HIDDEN" })
            }
          >
            <img src="/ui/splash_screen.jpg" />
          </SplashScreenContainer>
        ) : (
          ""
        )}
      </AnimatePresence>

      <Header>
        <img src="/ui/logo_white.svg" />
        <Button onClick={reset}>
          <IoMdRefresh />
          <span>Reset Game</span>
        </Button>
      </Header>

      <DeviceOuterContainer hidden={appState === "HIDDEN"}>
        <DeviceContainer>
          <PhoneRouter />
        </DeviceContainer>
        <HomeButtonContainer>
          <HomeButton onClick={goHome} />
        </HomeButtonContainer>
      </DeviceOuterContainer>
      <RightPanel>
        <LocationRouter />
      </RightPanel>
    </PageContainer>
  );
}

export default App;
