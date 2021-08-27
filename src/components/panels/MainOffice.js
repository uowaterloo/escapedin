import React, { useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";

export default function MainOffice() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  return (
    <InteractiveImage src="./office/main_office_hallway.jpg"></InteractiveImage>
  );
}
