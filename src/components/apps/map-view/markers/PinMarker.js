import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaTemperatureLow } from "react-icons/fa";

const MarkerContainer = styled.div`
  color: #ba2106;
  position: relative;

  & > * {
    transform: translateY(-50%);
  }
  & > *:first-child {
    font-size: 28px;
    cursor: context-menu;
    text-shadow: 1px 4px 8px rgba(0, 0, 0, 0.35);
    z-index: 0;
  }
`;

const PopoutContainer = styled.div`
  position: absolute;
  height: 200px;
  background-color: #fff;
  width: 200px;
  border: 1px solid grey;
  display: ${(props) => (props.visible ? "block" : "none")};
  margin: 0;
  padding: 0;
  border-radius: 4px;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.35);
  z-index: 20;
`;

const PopoutContainerMenu = styled.div`
  width: 100%;
  height: auto;
  background-color: #bf4320;
  color: #fff;
  padding: 4px;
  display: flex;

  align-items: center;

  & p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  & button {
    padding: 2px 4px;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    :hover {
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
    }

    :focus {
      outline: none;
    }
  }
`;

export default function PinMarker({
  id,
  title,
  children,
  onOpen = (x) => x,
  onClose = (x) => x,
}) {
  const [isExpanded, setExpanded] = React.useState(false);
  const toggle = () => {
    setExpanded((prev) => {
      if (prev) {
        setTimeout(() => onClose(id), 0);
      } else {
        setTimeout(() => onOpen(id), 0);
      }

      return !prev;
    });
  };

  return (
    <MarkerContainer>
      <FaMapMarkerAlt onClick={toggle} />
      <PopoutContainer visible={isExpanded}>
        <PopoutContainerMenu>
          <button onClick={toggle}>X</button>
          <p>{title}</p>
        </PopoutContainerMenu>
        {children}
      </PopoutContainer>
    </MarkerContainer>
  );
}
