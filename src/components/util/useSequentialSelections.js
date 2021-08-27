import { useState } from "react";

const useSequentialSelections = (order) => {
  /*
    Hook for validating a sequence of inputs in a certain desired order. Returns an array containing the valid sequence of IDs that have been selected. Any attempt to add an input that is not the next item in the sequence of inputs defined in `order` will result in the list of selected inputs being cleared.

    order: an array of expected inputs
  */

  const [currentSequence, setCurrentSequence] = useState([]);

  const handleInput = (value) => {
    setCurrentSequence((prevSequence) => {
      const index = prevSequence.length;

      if (order[index] === value) {
        return [...prevSequence, value];
      } else if (value === order[0]) {
        return [value];
      }

      return [];
    });
  };

  return [currentSequence, handleInput];
};

export default useSequentialSelections;
