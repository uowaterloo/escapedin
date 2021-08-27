import React, { useMemo, useEffect, useState, useContext } from "react";
import InteractiveImage from "../shared/interactive-image";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";
import useSequentialSelections from "../util/useSequentialSelections";
import Sound from "react-sound";
import { useHistory } from "react-router-dom";
import { StateContext, ActionTypes } from "../util/useApplicationState";
import Button from "../shared/button";

const expectedSequence = [4, 1, 0, 2, 0, 1, 8];

export default function DoorLockPuzzle() {
  const [sequence, updateSequence] = useSequentialSelections(expectedSequence);

  const [isMuted, setMuted] = useState(false);
  const [hasInteracted, setInteracted] = useState(false);
  const history = useHistory();

  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  if (completedPuzzles.includes("DOOR_PUZZLE")) {
    history.push("/bomb_room");
  }

  const onInteract = () => {
    if (!hasInteracted) {
      setInteracted(true);
    }
  };

  useEffect(() => {
    console.log(sequence);

    if (sequence.length === expectedSequence.length) {
      //Victory condition
      dispatch({ type: ActionTypes.completePuzzle, payload: "DOOR_PUZZLE" });
    }
  }, [sequence]);

  const ClickableRegions = useMemo(
    () => [
      {
        key: 1,
        x: [20, 25],
        y: [35.3, 41.2],
        onClick: () => updateSequence(1),
      },
      {
        key: 2,
        x: [25.4, 30.7],
        y: [35.5, 41.5],
        onClick: () => updateSequence(2),
      },
      {
        key: 3,
        x: [31.1, 35.8],
        y: [36.1, 41.7],
        onClick: () => updateSequence(3),
      },
      {
        key: 4,
        x: [36.5, 41.4],
        y: [36.1, 42.1],
        onClick: () => updateSequence(4),
      },
      {
        key: 5,
        x: [41.9, 47.0],
        y: [36.5, 42.1],
        onClick: () => updateSequence(5),
      },
      {
        key: 6,
        x: [20.5, 25.6],
        y: [42.0, 47.4],
        onClick: () => updateSequence(6),
      },
      {
        key: 7,
        x: [26.3, 30.7],
        y: [42.2, 47.8],
        onClick: () => updateSequence(7),
      },
      {
        key: 8,
        x: [31.4, 35.8],
        y: [42.2, 47.8],
        onClick: () => updateSequence(8),
      },
      {
        key: 9,
        x: [36.6, 41.4],
        y: [42.6, 48.1],
        onClick: () => updateSequence(9),
      },
      {
        key: 0,
        x: [42.0, 46.8],
        y: [42.7, 48.4],
        onClick: () => updateSequence(0),
      },
    ],
    [updateSequence]
  );

  return (
    <>
      <Sound
        url="/audio/countdown.mp3"
        playStatus={hasInteracted ? "PLAYING" : "STOPPED"}
        volume={isMuted ? 0 : 50}
        loop
      />
      <InteractiveImage
        areas={ClickableRegions}
        src="/office/door_lock.jpg"
        pointer
        onMouseMove={onInteract}
      >
        <p>Unlock the door to proceed.</p>
        <Button.IconButton onClick={() => setMuted((x) => !x)}>
          {isMuted ? <ImVolumeMute2 /> : <ImVolumeMedium />}
        </Button.IconButton>
      </InteractiveImage>
    </>
  );
}
