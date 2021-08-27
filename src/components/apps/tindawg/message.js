import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;

  padding: 8px;
`;

const MessageRow = styled.div`
  display: flex;

  & img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 16px;
    align-self: flex-start;
  }

  & p {
    padding: 10px;
    background-color: #f3f3f3;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 12px;
    color: #212121;
    align-self: flex-end;
  }
`;

const Heading = styled.p`
  font-size: 10px;

  text-align: center;
  padding: 6px 0 12px;
  color: #454545;

  & > strong {
    font-weight: 700;
  }
`;

export default function Message(props) {
  return (
    <Container>
      <Heading>
        You matched with <strong>Duke</strong> 1m Ago
      </Heading>
      <MessageRow>
        <img src="/tindawg_pets/06_dog.jpg"></img>
        <p>Call me at 519-745-2222</p>
      </MessageRow>
    </Container>
  );
}
