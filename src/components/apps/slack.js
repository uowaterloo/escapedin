import React, { useEffect } from "react";
import styled from "styled-components";
import StatusBar from "../shared/statusbar";
import StateContainer from "../shared/state-container";

const Container = styled(StateContainer)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  background-color: rgb(237, 237, 237);
  & > img {
    max-width: 100%;
    object-fit: contain;
  }
`;
const StyledStatusBar = styled(StatusBar)`
  position: absolute;
  top: 0;
`;

const hints = [
  "I came up with adding those lat/lon lines, find me first on the map.",
  "Some people don't like my projections, find me second on the map.",
  "I have many interests, including maps, find me third on the map.",
  "I'm the father of GIS, find me fourth on the map.",
  "I take a social approach to geography, find me fifth on the map.",
  "I created the modern atlas, find me sixth on the map",
];

export default function SlackView(props) {
  useEffect(() => {
    console.log(hints);
  }, []);

  return (
    <Container
      onClick={() =>
        window.open(
          "slack://channel?hint=ask-bot-for-riddle&team=T024SHDN6&id=C01GCKX6YLF"
        )
      }
    >
      <StyledStatusBar />
      <img src="/office/sphinx.png" />
    </Container>
  );
}
