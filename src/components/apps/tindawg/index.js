import React, { useContext } from "react";
import styled from "styled-components";
import StateContainer from "../../shared/state-container";
import TindawgSwiper from "./swiper";
import Message from "./message";
import { StateContext, ActionTypes } from "../../util/useApplicationState";

const Container = styled(StateContainer)`
  background-color: #f0f0f0;
  display: grid;
  grid-template: auto 1fr / 1fr;
`;

const BannerImage = styled.img`
  width: 100%;
  max-height: 48px;
  object-fit: contain;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.125);
  background-color: #fff;
  z-index: 1;
`;

export default function TindawgState() {
  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  const isPuzzleComplete = completedPuzzles.includes("TINDAWG");
  const markComplete = () =>
    setTimeout(
      dispatch({ type: ActionTypes.completePuzzle, payload: "TINDAWG" }),
      1000
    );

  return (
    <Container>
      <BannerImage src="/icons/tindawg_banner.png" />
      {isPuzzleComplete ? (
        <Message />
      ) : (
        <TindawgSwiper onSuccess={markComplete} />
      )}
    </Container>
  );
}
