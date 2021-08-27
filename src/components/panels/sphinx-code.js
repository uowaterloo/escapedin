import React, { useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import styled from "styled-components";

const Image = styled.img`
  width: 700px;
`;

export default function SphinxCode() {
  const history = useHistory();
  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  const isComplete = completedPuzzles.includes("MEETING_ROOM");
  return isComplete&&<Image src="./office/sphinx_code.png"></Image>;
}
