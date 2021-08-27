import React, { useContext, useState, useEffect, useRef } from "react";
import InteractiveImage from "../shared/interactive-image";
import { AiOutlineInfoCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import styled from "styled-components";
import Button from "../shared/button";

const InputContainer = styled.form`
  width: 100%;
  display: grid;
  grid-template: 1fr / max-content repeat(3, 1fr) max-content max-content;
  grid-gap: clamp(0px, 2.5%, 16px);

  input {
    text-transform: uppercase;
    background-color: ${(props) => props.inputBg ?? "#fff"};
    color: #000;
  }

  p {
    display: inline-flex;
    align-items: center;
  }
`;

const images = {
  SUCCESS: "/office/evr_square.jpg",
  FAILURE: "/ui/dog_shake.gif",
  INITIAL: "/office/FantasyMapEdited.jpg",
  HINT: "/office/morse_scroll_minimal.png",
};

const colors = {
  SUCCESS: "#30E5A5",
  FAILURE: "#F63654",
};

export default function FantasyWall() {
  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  const isPuzzleComplete = completedPuzzles.includes("FANTASYWALL");

  const [state, setState] = useState(isPuzzleComplete ? "SUCCESS" : "INITIAL"); //INITIAL, SUCCESS, FAILURE, HINT

  const toggleHint = (e) => {
    e.preventDefault();
    setState((prevVal) => {
      if (prevVal === "HINT") {
        return isPuzzleComplete ? "SUCCESS" : "INITIAL";
      }
      return "HINT";
    });
  };

  const [inputs, _setInput] = useState(["", "", ""]);

  const timeoutRef = useRef();

  const setInput = (index, value) => {
    _setInput((prevVals) => {
      const newArr = [...prevVals];
      newArr[index] = value;
      return newArr;
    });
  };

  const markComplete = () => {
    dispatch({ type: ActionTypes.completePuzzle, payload: "FANTASYWALL" });
  };

  const validate = (e) => {
    e.preventDefault();

    if (
      inputs[0].toLowerCase() === "n3" &&
      inputs[1].toLowerCase() === "i6" &&
      inputs[2].toLowerCase() === "u5"
    ) {
      setState("SUCCESS");
      markComplete();
    } else {
      setState("FAILURE");
      timeoutRef.current = setTimeout(() => {
        setState("INITIAL");
      }, 2500);
    }
  };

  useEffect(
    () => () => timeoutRef.current && clearTimeout(timeoutRef.current),
    []
  );

  return (
    <>
      <InteractiveImage magnifier animationPlay={true} src={images[state]}>
        <InputContainer
          inputBg={
            isPuzzleComplete
              ? colors.SUCCESS
              : state === "FAILURE"
              ? colors.FAILURE
              : "#fff"
          }
        >
          <p>Grid Code:</p>
          <input
            value={inputs[0]}
            onChange={(e) => {
              setInput(0, e.target.value);
            }}
            placeholder="A1"
            disabled={isPuzzleComplete}
          />
          <input
            value={inputs[1]}
            onChange={(e) => {
              setInput(1, e.target.value);
            }}
            placeholder="A1"
            disabled={isPuzzleComplete}
          />
          <input
            value={inputs[2]}
            onChange={(e) => {
              setInput(2, e.target.value);
            }}
            placeholder="A1"
            disabled={isPuzzleComplete}
          />

          <Button type="submit" onClick={validate} disabled={isPuzzleComplete}>
            Submit
          </Button>
          <Button.IconButton onClick={toggleHint}>
            {state === "HINT" ? (
              <AiOutlineCloseCircle />
            ) : (
              <AiOutlineInfoCircle />
            )}
          </Button.IconButton>
        </InputContainer>
      </InteractiveImage>
    </>
  );
}
