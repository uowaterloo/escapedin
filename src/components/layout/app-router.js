import React from "react";
import { AnimatePresence } from "framer-motion";
import { StateContext } from "../util/useApplicationState";

import LockScreen from "../apps/lock-screen";
import HomeScreen from "../apps/home-screen";
import MapView from "../apps/map-view";
import SlackView from "../apps/slack";
import PhoneView from "../apps/dialer";
import Player from "../apps/player";
import Tindawg from "../apps/tindawg";

export default function AppRouter() {
  const {
    state: { appState },
  } = React.useContext(StateContext);

  console.log(appState);

  return (
    <AnimatePresence>
      {appState === "TINDAWG" && <Tindawg key="tindawg-view-outer" />}

      {appState === "PLAYER" && <Player key="youtube-view-outer" />}

      {appState === "MAP" && <MapView key="map-view-outer" />}

      {appState === "PHONE" && <PhoneView key="map-view-outer" />}

      {(appState === "LOCKSCREEN" || appState === "LOCKSCREEN.UNLOCK") && (
        <LockScreen key="lock-screen-outer" />
      )}

      {appState === "SLACK" && <SlackView />}

      {appState === "HOME" && <HomeScreen key="home-screen-outer" />}
    </AnimatePresence>
  );
}
