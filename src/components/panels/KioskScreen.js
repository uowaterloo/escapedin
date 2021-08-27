import React, { useContext, useState, useEffect } from "react";
import InteractiveImage from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import styled from "styled-components";
import Button from "../shared/button";
import { AiOutlineInfoCircle } from "react-icons/ai";

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 16px;

  p {
    align-self: center;
  }
`;

export default function KioskScreen() {
  const history = useHistory();
  const { state, dispatch } = useContext(StateContext);
  const [dataInput, setDataInput] = useState("");

  useEffect(() => {
    if (dataInput == "1935") {
      setTimeout(() => {
        dispatch({ type: ActionTypes.setState, payload: "LOCKSCREEN" });
        dispatch({ type: ActionTypes.completePuzzle, payload: "KIOSK" });
        history.push("/outside_office");
      }, 150);
    }
  }, [dataInput]);

  const ClickableRegions = [
    {
      key: 1,
      x: [30, 70],
      y: [15, 80],
      onClick: () =>
        window.open(
          "https://www.google.ca/maps/@43.4973584,-80.5268509,3a,75y,112.2h,91.61t/data=!3m6!1e1!3m4!1sAF1QipPrXC_fqOLgAtJrkLwGd6Q1MJfz06e2QkIM-jWv!2e10!7i13312!8i6656"
        ),
    },
  ];

  return (
    <InteractiveImage
      areas={ClickableRegions}
      src="./office/MappinsDirectory.png"
    >
      <img src="./office/MappinsHint.png" height="70" />
      <InputContainer>
        <p>Answer:</p>
        <input
          value={dataInput}
          onChange={(e) => {
            setDataInput(e.target.value);
          }}
        />
        <Button.IconButton
          onClick={() =>
            window.open(
              "https://www.conestogamall.com/map/#/directions/from/198/to/163/map"
            )
          }
        >
          <AiOutlineInfoCircle />
        </Button.IconButton>
      </InputContainer>
    </InteractiveImage>
  );
}
