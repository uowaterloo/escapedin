import React, { useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import styled from "styled-components";

const Image = styled.img`
  width: 700px;
`;

export default function ServerRoom() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  return <Image src="./office/values_wall.png"></Image>;
}
