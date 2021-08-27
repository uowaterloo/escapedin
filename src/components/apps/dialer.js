import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StatusBar from "../shared/statusbar";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import StateContainer from "../shared/state-container";
import Sound from "react-sound";
import { useStopwatch } from "react-timer-hook";

const Wrapper = styled(StateContainer)`
  width: 100%;
  height: 100%;
  background-color: white;
  backdrop-filter: blur(8px) contrast(1.5) brightness(0.6);
  z-index: 1;
  color: black;
  opacity: 0;
  position: relative;
`;

const PasscodeInputWrapper = styled.div`
  display: grid;
  margin: 0 20%;

  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-row-gap: 5%;
  grid-column-gap: 10%;

  & > button {
    background-color: lightgrey;
    backdrop-filter: brightness(2);
    border: none;
    color: black;
    border-radius: 50%;
    align-self: center;
    justify-self: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;

    :nth-child(2) {
      grid-row: 1;
      grid-column: 1;
    }

    :hover {
      backdrop-filter: brightness(2.5) opacity(0.5);
    }

    :focus {
      outline: none;
      border: none;
    }
  }

  & > .phoneIcon {
    background: limegreen;
  }

  & > .hangUpIcon {
    background: orangered;
  }

  & > .deleteButton {
    background-image: url(./icons/cancel_button.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: transparent;
  }

  & > .clearButton {
    background: transparent;
  }
`;

const PhoneInputView = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  position: relative;
  max-width: 100%;
  min-height: 100px;
  overflow: hidden;
  cursor: pointer;
  justify-content: center;
`;

export default function PhoneView(props) {
  const [inputValue, setInputValue] = useState("");
  const [callState, setCallState] = useState("INPUT"); // INPUT, DIALING, TRANSITION, FAILURE, SUCCESS
  const isCalling = callState !== "INPUT";
  const { seconds, start, reset } = useStopwatch();
  const formattedTime = seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;

  useEffect(() => {
    switch (callState) {
      case "SUCCESS":
      case "FAILURE":
        reset();
        start();
        break;
      case "TRANSITION":
        if (inputValue === "519-745-2222") {
          setCallState("SUCCESS");
        } else {
          setCallState("FAILURE");
        }
        break;
      default:
        break;
    }
  }, [callState]);

  const handlePhoneInput = (event, char) => {
    event.stopPropagation();
    event.preventDefault();

    setInputValue((prevVal) => {
      if (prevVal.length === 12) {
        return prevVal;
      }

      if (prevVal.length === 3 || prevVal.length === 7) {
        prevVal += "-";
      }

      return prevVal + char.toString();
    });
  };

  const deletePhoneInput = () => {
    setInputValue((prevVal) => {
      return prevVal.slice(0, -1);
    });
  };

  const hangUp = () => {
    setCallState("INPUT");
  };

  const call = () => {
    setCallState("DIALING");
  };

  const phoneInputs = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "0",
    "#",
  ];

  return (
    <>
      <Sound
        url="/audio/phone_dialing.mp3"
        playStatus={callState === "DIALING" ? "PLAYING" : "STOPPED"}
        onFinishedPlaying={() => setCallState("TRANSITION")}
      />
      <Sound
        url="/audio/phone_fail.mp3"
        playStatus={callState === "FAILURE" ? "PLAYING" : "STOPPED"}
        onFinishedPlaying={() => setCallState("INPUT")}
      />
      <Sound
        url="/audio/morse_code_edit.mp3"
        playStatus={callState === "SUCCESS" ? "PLAYING" : "STOPPED"}
        onFinishedPlaying={() => setCallState("INPUT")}
      />
      <Wrapper key="phone-container">
        <StatusBar />

        <PhoneInputView>
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            {inputValue}
          </p>

          <p style={{ textAlign: "center", marginTop: "8px" }}>
            {callState === "DIALING"
              ? "Connecting..."
              : callState !== "INPUT"
              ? formattedTime
              : ""}
          </p>
        </PhoneInputView>

        <PasscodeInputWrapper>
          <div
            style={{
              gridRow: "1",
              gridColumn: "1",
              width: 0,
              paddingBottom: "100%",
            }}
          />
          {phoneInputs.map((e, i) => (
            <button
              key={i}
              onClick={(event) => {
                handlePhoneInput(event, phoneInputs[i]);
              }}
            >
              {phoneInputs[i]}
            </button>
          ))}
          <button className="clearButton"></button>
          {callState === "INPUT" ? (
            <button
              className="phoneIcon"
              onClick={() => {
                call();
              }}
            >
              <ImPhone color="white" />
            </button>
          ) : (
            <button
              className="hangUpIcon"
              onClick={() => {
                hangUp();
              }}
            >
              <ImPhoneHangUp color="white" />
            </button>
          )}
          <button
            className="deleteButton"
            onClick={() => {
              deletePhoneInput();
            }}
          ></button>
        </PasscodeInputWrapper>
      </Wrapper>
    </>
  );
}
