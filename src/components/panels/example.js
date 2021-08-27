import React, { useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";

export default function ExampleLocation() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);

  const ClickableRegions = [
    {
      key: 0,
      x: [10, 20],
      y: [10, 20],
      onClick: () => console.log("I was clicked"),
    },
    {
      key: 1,
      x: [50, 75],
      y: [30, 95],
      onClick: () => history.push("/2"),
    },
  ];

  const openMap = () => {
    dispatch({ type: ActionTypes.setState, payload: "MAP" });
  };

  return (
    <InteractiveImage
      areas={ClickableRegions}
      src="http://placekitten.com/g/500/500"
    >
      <Link to="2">Page 2</Link>
      <button onClick={openMap}>Show Map</button>
    </InteractiveImage>
  );
}
