import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import KioskScreen from "../panels/KioskScreen";
import ValuesWall from "../panels/ValuesWall";
import PetWall, { PetWallAnswer } from "../panels/PetWall";
import ServerRoom from "../panels/ServerRoom";
import BookCase from "../panels/BookCase";
import OutsideOffice from "../panels/OutsideOffice";
import MainOffice from "../panels/MainOffice";
import FantasyWall from "../panels/fantasy-wall";
import DoorPuzzle from "../panels/door-lock";
import SphinxCode from "../panels/sphinx-code";
import BombRoom from "../panels/BombRoom";

export default function PanelRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <KioskScreen />
      </Route>
      <Route exact path="/2">
        You are at the 2nd path
        <Link to="/">Page 1</Link>
      </Route>
      <Route exact path="/values_wall">
        <ValuesWall />
      </Route>
      <Route exact path="/outside_office">
        <OutsideOffice />
      </Route>
      <Route exact path="/main_office">
        <MainOffice />
      </Route>
      <Route exact path="/door_puzzle">
        <DoorPuzzle />
      </Route>
      <Route exact path="/server_room">
        <ServerRoom />
      </Route>
      <Route exact path="/bookcase">
        <BookCase />
      </Route>
      <Route exact path="/pet_wall">
        <PetWall />
      </Route>
      <Route exact path="/fantasy_wall">
        <FantasyWall />
      </Route>
      <Route exact path="/sphinx_code">
        <SphinxCode />
      </Route>
      <Route exact path="/bomb_room">
        <BombRoom />
      </Route>
    </Switch>
  );
}
