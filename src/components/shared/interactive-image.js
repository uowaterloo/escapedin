import React from "react";
import styled, { keyframes } from "styled-components";
import Magnifier from "react-magnifier";

const fadeIn = keyframes`
  0%{
    opacity:0;
    //transform: rotate(0deg);
  }

  100% {
    opacity:1;
    //transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 50vw;
  max-width: 700px;
  height: 50vw;
  max-height: 700px;
  background-color: transparent;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.3);
  background-image: url(${(props) => props.backgroundSrc});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  animation: ${(props) => (props.animationPlay ? fadeIn : "")} ease 1.5s;
  background-size: contain;
  background-position: center;
  overflow: hidden;
`;

const Clickable = styled.div`
  border: ${(props) => (props.debug ? "1px solid red" : "none")};
  cursor: ${(props) => (props.pointer ? "pointer" : "auto")};
  position: absolute;
  left: ${(props) => props.x[0]}%;
  width: ${(props) => props.x[1] - props.x[0]}%;
  top: ${(props) => props.y[0]}%;
  height: ${(props) => props.y[1] - props.y[0]}%;
  transform: rotate(${(props) => props.rotation ?? 0}deg);
`;

const ControlsMenu = styled.div`
  width: 100%;
  height: 10%;
  background-color: #000;

  z-index: 50;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  color: #fff;
  align-items: center;
  padding: 0 2.5%;

  a,
  a:link,
  a:visited,
  a:active {
    color: unset;
  }
`;

const MagnifierContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function InteractiveImage({
  src,
  areas,
  children,
  debug = false,
  pointer = false,
  magnifier = false,
  zoomFactor = 1.5,
  ...rest
}) {
  return (
    <Container backgroundSrc={!magnifier && src} {...rest}>
      {magnifier && (
        <MagnifierContainer>
          <Magnifier src={src} zoomFactor={zoomFactor} />
        </MagnifierContainer>
      )}
      {areas &&
        areas.map((area) => (
          <Clickable {...area} debug={debug} pointer={pointer} />
        ))}
      {children && <ControlsMenu>{children}</ControlsMenu>}
    </Container>
  );
}
