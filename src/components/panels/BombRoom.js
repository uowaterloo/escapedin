import React, { useContext, useState, useEffect, useRef } from "react";
import { Container as InteractiveImageContainer } from "../shared/interactive-image";
import { Link, useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import styled from "styled-components";
import { useStopwatch, useTimer } from "react-timer-hook";

const Container = styled(InteractiveImageContainer)`
  background-image: url(${(props) => props.bgImage});
`;

const Congrats = styled.div`
  position: absolute;
  left: 30%;
  right: 40%;
  top: 15%;
  bottom: auto;
  
  font-size: 50px;
  color: pink;
`;

const TimerWrapper = styled.div`
  position: absolute;
  left: 30%;
  right: 40%;
  top: 53%;
  bottom: auto;

  display: grid;
  grid-template: 1fr / repeat(3, 1fr);
  grid-gap: 20%;

  & > input {
    font-size: 50px;
    width: 60px;
    color: red;
    border: none;
    text-transform: uppercase;
    background-color: white;
  }
`;

const InputWrapper = styled.div`
  position: absolute;
  left: 18.5%;
  right: 18.5%;
  top: 80%;
  bottom: 14.5%;

  display: grid;
  grid-template: 1fr / repeat(4, 1fr);
  grid-gap: 3.5%;

  & > input {
    color: #000;
    border: none;
    text-transform: uppercase;
  }
`;

const unlockCode = ["stay", "hom", "fur", "evr"];

export default function BombRoom() {
  const [dataInput, _setDataInput] = useState(["", "", "", ""]);
  const timeoutRef = useRef();

  const setData = (index, value) => {
    _setDataInput((prevVal) => {
      const newArr = [...prevVal];
      newArr[index] = value;
      return newArr;
    });
  };

  const [puzzleImage, setPuzzleImage] = useState(
    "/office/bombdefusalUI.jpg"
  );

  useEffect(() => {
    const isValid = dataInput.every(
      (value, index) => unlockCode[index].toLowerCase() === value.toLowerCase()
    );

    if (isValid) {
      timeoutRef.current = setTimeout(() => {
        setPuzzleImage("https://media.giphy.com/media/cReBRwdnlW9gs/giphy.gif")
        //alert("Puzzle unlocked");
      }, 250);
    }
  }, [dataInput]);

  useEffect(
    () => () => timeoutRef.current && clearTimeout(timeoutRef.current),
    []
  );

  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 minutes timer
  const expiryTimestamp = time;
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (puzzleImage == "/office/bombdefusalUI.jpg" ? (
    <Container bgImage={puzzleImage}>
      <TimerWrapper>
        <input type="text" value={hours} />
        <input type="text" value={minutes} />
        <input type="text" value={seconds} />
      </TimerWrapper>

      <InputWrapper>
        <input
          type="text"
          value={dataInput[0]}
          onChange={(e) => setData(0, e.target.value)}
        />
        <input
          type="text"
          value={dataInput[1]}
          onChange={(e) => setData(1, e.target.value)}
        />
        <input
          type="text"
          value={dataInput[2]}
          onChange={(e) => setData(2, e.target.value)}
        />
        <input
          type="text"
          value={dataInput[3]}
          onChange={(e) => setData(3, e.target.value)}
        />
      </InputWrapper>
    </Container>
  ) : (
      <Container bgImage={puzzleImage}>
        <Congrats> Congratulations!  </Congrats>
    </Container>
  ));
}
