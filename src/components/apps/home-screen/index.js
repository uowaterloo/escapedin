import React, { useContext } from "react";
import styled from "styled-components";
import StatusBar from "../../shared/statusbar";
import AppIcon from "./app-icon";
import { motion } from "framer-motion";
import { StateContext } from "../../util/useApplicationState";

const Container = styled(motion.div)`
  height: 100%;
  background: url("/icons/tindawg_legend_morse.png");
  background-size: cover;
  background-position: center;

  color: #fff;
  display: flex;
  flex-direction: column;
`;

const AppGrid = styled.div`
  flex: 0 1 100%;
  max-width: 100%;

  padding: 16px 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 2.5%;
`;

export default function HomeScreen(props) {
  const {
    state: { completedPuzzles },
  } = useContext(StateContext);

  return (
    <Container
      key="home-screen"
      initial={{ scale: 1, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, delay: 0.1 },
      }}
      exit={{ scale: 1, opacity: 0, transition: { delay: 0.2, duration: 0.5 } }}
    >
      <StatusBar />
      <AppGrid>
        <AppIcon
          src="https://us.123rf.com/450wm/bentosi/bentosi1812/bentosi181200032/127097317-pin-maps-location-icon-vector.jpg?ver=6"
          label="Maps"
          appState="MAP"
        />
        <AppIcon
          src="http://placekitten.com/g/200/200"
          appState="LOCKSCREEN"
          label="Lock Device"
        />
        <AppIcon
          src="/icons/slack_icon.png"
          appState="SLACK"
          label="Slack"
          notificationNumber={
            completedPuzzles.includes("MEETING_ROOM") ? null : "1"
          }
        />
        <AppIcon
          src="/icons/youtube_icon.jpg"
          appState="PLAYER"
          label="YouTube"
          notificationNumber={completedPuzzles.includes("PLAYER") ? null : "1"}
        />
        <AppIcon src="/icons/phone_icon.png" appState="PHONE" label="Phone" />
        <AppIcon
          src="/icons/tindawg.png"
          appState="TINDAWG"
          label="Tindawg"
          notificationNumber={completedPuzzles.includes("TINDAWG") ? null : "1"}
        />
      </AppGrid>
    </Container>
  );
}
