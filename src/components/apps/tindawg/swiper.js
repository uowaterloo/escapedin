import React, { useMemo, useState } from "react";
import TinderCard from "react-tinder-card";
import { useSequentialSelections } from "../map-view/utils";
import { ImCross } from "react-icons/im";
import { IoHeartSharp } from "react-icons/io5";
import { FaUndoAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AnimatePresence } from "framer-motion";
import {
  CardContainer,
  Card,
  ButtonsContainer,
  ActionButton,
  SwiperContainer,
  EmptyCard,
} from "./swiper.styles";

const db = [
  {
    name: "Duke",
    url: "/tindawg_pets/06_dog.jpg",
  },
  {
    name: "Pupcake",
    url: "/tindawg_pets/05_dog.jpg",
  },
  {
    name: "Sphinx",
    url: "/tindawg_pets/04_cat.jpg",
  },
  {
    name: "Croissant",
    url: "/tindawg_pets/03_cat.jpg",
  },
  {
    name: "Fido",
    url: "/tindawg_pets/02_dog.jpg",
  },
  {
    name: "Biscuit",
    url: "/tindawg_pets/01_cat.jpg",
  },
];

const expectedSequence = ["left", "right", "left", "left", "right", "right"];

export default function TindawgSwiper({ onSuccess = () => null }) {
  const [characters, setCharacters] = useState([]);
  const [removedCharacters, setRemovedCharacters] = useState([]);
  const [sequence, addToSequence] = useSequentialSelections(expectedSequence);

  const reset = () => {
    addToSequence(null);
    setCharacters(db);
    setRemovedCharacters([]);
  };

  React.useEffect(() => {
    reset();
  }, []);

  const childRefs = useMemo(
    () =>
      characters.reduce((acc, curr) => {
        acc[curr.name] = React.createRef();
        return acc;
      }, {}),
    [characters]
  );

  const swiped = React.useCallback(
    (direction, nameToDelete) => {
      addToSequence(direction);

      setRemovedCharacters((prevState) => [...prevState, nameToDelete]);
    },
    [setRemovedCharacters, characters]
  );

  const outOfFrame = React.useCallback(
    (name) => {
      console.log(name + " left the screen!");
      setCharacters((prevState) =>
        prevState.filter((character) => character.name !== name)
      );
    },
    [setCharacters, characters]
  );

  const swipe = React.useCallback(
    (dir) => {
      const cardsLeft = characters.filter(
        (person) => !removedCharacters.includes(person.name)
      );
      if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
        setRemovedCharacters((prevState) => [...prevState, toBeRemoved]);
        // Make sure the next card gets removed next time if this card do not have time to exit the screen

        if (childRefs[toBeRemoved] && childRefs[toBeRemoved].current) {
          childRefs[toBeRemoved].current.swipe(dir); // Swipe the card!
        }
      }
    },
    [characters, setRemovedCharacters, removedCharacters, db]
  );

  React.useEffect(() => {
    if (sequence.length === expectedSequence.length) {
      onSuccess();
    }
  }, [sequence]);

  return (
    <SwiperContainer>
      <CardContainer isEmpty={characters.length > 0}>
        {characters.length > 0 ? (
          characters.map((character, index) => (
            <TinderCard
              ref={childRefs[character.name]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <Card
                style={{
                  backgroundImage: "url(" + character.url + ")",
                }}
                className="card"
              >
                <h3>{character.name}</h3>
              </Card>
            </TinderCard>
          ))
        ) : (
          <AnimatePresence>
            <EmptyCard
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <img src="/icons/tindawg_alpha.png" />
              <p>
                Can't sniff out any matches? Try standing out from the
                background!
              </p>
            </EmptyCard>
          </AnimatePresence>
        )}
      </CardContainer>
      <ButtonsContainer>
        <IconContext.Provider value={{ color: "#F63654" }}>
          <ActionButton
            onClick={() => swipe("left")}
            disabled={characters.length === 0}
          >
            <ImCross />
          </ActionButton>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#F8B10D" }}>
          <ActionButton onClick={() => reset()}>
            <FaUndoAlt />
          </ActionButton>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: "#30E5A5" }}>
          <ActionButton
            onClick={() => swipe("right")}
            disabled={characters.length === 0}
          >
            <IoHeartSharp />
          </ActionButton>
        </IconContext.Provider>
      </ButtonsContainer>
    </SwiperContainer>
  );
}
