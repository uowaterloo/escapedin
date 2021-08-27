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

export default function LocationRedirectMarker({
  text,
  onActivate = (x) => x,
}) {
  return (
    <MarkerContainer>
      <FaMapMarkerAlt onClick={onActivate} />
    </MarkerContainer>
  );
}
