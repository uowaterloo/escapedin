import React, { useContext, useState, useRef, useEffect } from "react";
import InteractiveImage from "../shared/interactive-image";
import Button from "../shared/button";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template: 1fr / max-content repeat(3, 1fr) max-content;
  grid-gap: clamp(4px, 2.5%, 16px);
  input {
    background-color: ${(props) => props.bgColor};
  }
`;

export default function PetWall() {
  const [inputs, _setInput] = useState(["", "", ""]);

  const timeoutRef = useRef();

  const setInput = (index, value) => {
    _setInput((prevVals) => {
      const newArr = [...prevVals];
      newArr[index] = value;
      return newArr;
    });
  };

  const [colorState, setColorState] = useState("rgba(0, 0, 0, 0.85)");

  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  const isPuzzleComplete = completedPuzzles.includes("PETWALL");

  const markComplete = () =>
    (timeoutRef.current = setTimeout(
      () => dispatch({ type: ActionTypes.completePuzzle, payload: "PETWALL" }),
      1000
    ));

  useEffect(
    () => () => timeoutRef.current && clearTimeout(timeoutRef.current),
    []
  );

  const validate = () => {
    if (inputs[0] === "6" && inputs[1] === "5" && inputs[2] === "10") {
      setColorState("#30E5A5");
      markComplete();
    } else {
      setColorState("#F63654");
    }
  };

  return isPuzzleComplete ? (
    <InteractiveImage src="./office/PetWallAnswerEdit.jpg">
      <> </>
    </InteractiveImage>
  ) : (
    <InteractiveImage
      animationPlay={true}
      src="./office/PetWallOriginalEdit.jpg"
    >
      <InputContainer bgColor={colorState}>
        <p>Dog Code:</p>
        <input
          value={inputs[0]}
          onChange={(e) => {
            setInput(0, e.target.value);
          }}
          type="number"
        />
        <input
          value={inputs[1]}
          onChange={(e) => {
            setInput(1, e.target.value);
          }}
          type="number"
        />
        <input
          value={inputs[2]}
          onChange={(e) => {
            setInput(2, e.target.value);
          }}
          type="number"
        />
        <Button onClick={validate}>Submit Code</Button>
      </InputContainer>
    </InteractiveImage>
  );
}
