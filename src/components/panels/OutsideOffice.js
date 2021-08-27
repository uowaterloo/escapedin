import React, { useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import Button from "../shared/button";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";

export default function OutsideOffice() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  const enterOffice = () => {
    history.push("/main_office");
  };

  return (
    <InteractiveImage src="./office/outside_office.png">
      <Button onClick={enterOffice}>Enter the office</Button>
    </InteractiveImage>
  );
}
