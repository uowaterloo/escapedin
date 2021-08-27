import styled from "styled-components";
import { motion } from "framer-motion";
import StatusBar from "../../shared/statusbar";
import StateContainer from "../../shared/state-container";

export const Wrapper = styled(StateContainer)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  background: #fff;
  position: relative;

  z-index: 1;
  padding: 0px;
  color: #fff;
  display: grid;
  grid-template: 1fr / 1fr;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const Row = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const LoadingScreen = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #bf4320;
  z-index: 100;
`;

export const StyledStatusBar = styled(StatusBar)`
  position: absolute;
  top: 0;
  background-color: rgb(40, 40, 40);
  border-bottom: 1px solid rgb(100, 100, 100);
  box-shadow: 2px 0px 4px rgba(40, 40, 40, 0.75);
  color: white;
  z-index: 1000;
`;

export const InterfaceContainer = styled.div`
  height: 10%;
  max-height: 10%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  z-index: 10;
  padding: 4px;
  background-color: #1f4e6e;
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
