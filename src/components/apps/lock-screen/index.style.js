import styled from "styled-components";


export const PasscodeInputWrapper = styled.div`
  display: grid;
  margin: 0 15%;

  grid-template-columns: auto auto auto;
  grid-auto-rows: 1fr;
  grid-row-gap: 5%;
  grid-column-gap: 10%;

  @media (max-height: 600px) {
    margin: 0 33%;
  }

  @media (max-height: 750px) {
    margin: 0 25%;
  }

  & > button {
    background-color: transparent;
    backdrop-filter: brightness(2);
    border: none;
    color: #fff;
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

    :last-child {
      grid-column: 2;
    }

    :hover {
      backdrop-filter: brightness(2.5) opacity(0.5);
    }

    :focus {
      outline: none;
      border: none;
    }
  }
`;

export const CancelButton = styled.button`
  color: #fff;
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: transparent;
  outline: none;
  border: none;
`;