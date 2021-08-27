import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const EmptyCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  text-align: center;
  padding: 16px;
  align-items: center;
  color: #212121;
  font-size: 14px;

  & > img {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }
`;

export const SwiperContainer = styled.div`
  display: grid;
  grid-template: 1fr auto / 1fr;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  flex-grow: 1;
  margin: 32px;
  border-radius: 8px;
  & > * {
    grid-column: 1;
    grid-row: 1;
    border-radius: 8px;

    :first-child {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.25);
    }
  }
  overflow: visible;
`;

export const Card = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5%;
  font-weight: 700;
  color: #fff;
  font-size: 24px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.125);
  cursor: pointer;
  border-radius: 8px;
`;

export const ButtonsContainer = styled.div`
  padding: 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

export const ActionButton = styled.button`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.18);
  font-size: 24px;
  background: #fff;
  border-style: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  padding: 8px;
  display: grid;
  align-content: center;
  justify-content: center;

  transition: filter 0.1s ease-in;

  :focus {
    outline: none;
  }

  :active {
    outline: none;
    filter: brightness(80%) drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.33));
  }

  ${(props) =>
    props.disabled &&
    css`
      filter: grayscale(75%);
      opacity: 66%;
      cursor: unset;
    `}
`;
