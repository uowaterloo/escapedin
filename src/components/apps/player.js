import React, { useContext } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player/youtube";
import { motion, AnimatePresence } from "framer-motion";
import StateContainer from "../shared/state-container";
import { StateContext, ActionTypes } from "../util/useApplicationState";

const Container = styled(StateContainer)`
  background-color: #fff;
  display: grid;
  grid-template: 40% auto 1fr / 1fr;
`;

const VideoContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-height: 100%;

  & > * {
    max-width: 100%;
    max-height: 100%;
  }
`;

const VideoDescriptionContainer = styled.div`
  padding: 8px 12px;

  & > h2 {
    font-size: 14px;
  }

  & > h3 {
    margin-top: 6px;
    font-size: 10px;
  }

  border-bottom: 1px solid lightgrey;
  box-shadow: 2px 0px 4px rgba(40, 40, 40, 0.5);
`;

const DummyContentContainer = styled.div`
  padding: 8px;
  overflow-y: scroll;
`;

const Card = styled(motion.div)`
  width: 90%;
  background-color: lightgrey;
  margin: 16px auto;
  border-radius: 5px;
  padding: 5%;
`;

const TextHint = styled(motion.p)`
  color: rgba(0, 0, 0, 0.65);
`;

const Author = styled.div`
  font-weight: bold !important;
`;

const textHintVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const comments = [
  { text: "Ugh seriously", author: "ragefilledpriscilla" },
  {
    text:
      "I'm here after the legend Sebastian Vettel brought this masterpiece up",
    author: "hinityspurious",
  },
  {
    text: "My professor sent us this link as the final exam key........",
    author: "antleeding",
  },
  { text: "Jokes on you, I love this song.", author: "sluffenportkey" },
  {
    text:
      "Who else clicked on this video because they genuinely like the song?",
    author: "proportionshine",
  },
  {
    text:
      "Wait a minute, this is not the darude sandstorm song someone link me to.",
    author: "fallaciousorderly",
  },
  {
    text:
      "Who else was watching the F1 Bahrain FP2 and came here after Vettel's radio?",
    author: "elaborateboromir",
  },
];

var finalComment = {
  text:
    "The passcode is the initials of a book by Andrew S. Grove, it's so good that you should get 2 copies!",
  author: "realhumanbean",
};

export default function Component(props) {
  const {
    state: { completedPuzzles },
    dispatch,
  } = useContext(StateContext);

  const setComplete = () =>
    dispatch({ type: ActionTypes.completePuzzle, payload: "PLAYER" });
  const isComplete = completedPuzzles.includes("PLAYER");

  return (
    <Container>
      <VideoContainer>
        <ReactPlayer
          url="https://youtu.be/Qkuu0Lwb5EM?t=16"
          playsinline
          onEnded={setComplete}
          playing
        />
      </VideoContainer>
      <VideoDescriptionContainer>
        <h2>WATCH THIS VIDEO UNTIL THE VERY END!!</h2>
        <h3>342,561,000 Views • 9 Years Ago</h3>
      </VideoDescriptionContainer>
      <DummyContentContainer>
        <AnimatePresence>
          {isComplete && (
            <Card
              style={{
                background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.7, type: "tween" }}
            >
              <TextHint initial="visible" variants={textHintVariants}>
                {finalComment.text}
                <Author>- {finalComment.author}</Author>
              </TextHint>
            </Card>
          )}
        </AnimatePresence>
        {comments.map((c) => (
          <Card>
            {c.text}
            <Author>- {c.author}</Author>
          </Card>
        ))}
      </DummyContentContainer>
    </Container>
  );
}
