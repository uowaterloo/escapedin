import React from "react";
import styled from "styled-components";

import { IoMdLock } from "react-icons/io";

const Container = styled.div`
  border: 1px solid red;
  color: #000;
  background-color: #fff;
  padding: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PasscodeInputWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;

  & > button {
    :nth-child(2) {
      grid-row: 1;
      grid-column: 1;
    }

    :last-child {
      grid-column: 2;
    }
  }
`;

export default function LockMarker({ passcode, onCloseAction, onSuccess }) {
  const [inputVal, setInputVal] = React.useState("");

  const handlePasscodeInput = (e, char) => {
    setInputVal((prevVal) => {
      if (prevVal.length < passcode.length) {
        const newValue = prevVal + char.toString();
        return newValue;
      } else {
        return prevVal;
      }
    });
  };

  React.useEffect(() => {
    if (inputVal.length === passcode.length) {
      if (inputVal === passcode) {
        onSuccess();
      } else {
        setInputVal("");
      }
    }
  }, [inputVal]);

  return (
    <Container>
      <button onClick={() => onCloseAction()}>Close</button>
      <IoMdLock />
      <PasscodeInputWrapper>
        <div
          style={{
            gridRow: "1",
            gridColumn: "1",
            width: 0,
            paddingBottom: "100%",
          }}
        />
        {[...Array(10)].map((e, i) => (
          <button
            key={i}
            onClick={(event) => handlePasscodeInput(event, (i + 1) % 10)}
          >
            {(i + 1) % 10}
          </button>
        ))}
      </PasscodeInputWrapper>
    </Container>
  );
}
