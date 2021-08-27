import React from "react";
import styled from "styled-components";
import { StateContext, ActionTypes } from "../../util/useApplicationState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  position: relative;
  max-width: 100%;
  min-height: 0;
  overflow: hidden;
  cursor: pointer;

  & > img {
    overflow: hidden;
    object-fit: contain;
    width: 5vh;
    border-radius: 1.5vh;
    max-width: 50px;
    max-height: 50px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  & > p {
    text-align: center;
    font-size: 12px;
    margin-top: 10%;
  }

  & > .badge {
    position: absolute;
    top: 0;
    right: 15%;
    color: #fff;
    background-color: red;
    border-radius: 50%;
    padding: 4px 5px;
    border: 2px solid #fff;
    font-size: 8px;
  }
`;

export default function AppIcon({ src, appState, label, notificationNumber }) {
  const { dispatch } = React.useContext(StateContext);

  return (
    <Container
      onClick={() => {
        dispatch({ type: ActionTypes.setState, payload: appState });
      }}
    >
      <img src={src} />
      <p>{label}</p>
      {notificationNumber && <div className="badge">{notificationNumber}</div>}
    </Container>
  );
}
