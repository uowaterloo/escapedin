import styled from "styled-components";

const Button = styled.button`
  align-self: center;
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 8px 4px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;

  & > svg + span {
    padding-left: 4px;
    display: block;
  }

  transition: opacity 0.25s ease;

  :hover {
    opacity: 0.75;
  }

  :focus {
    outline: none;
  }
`;

Button.IconButton = styled(Button)`
  font-size: 24px;
  padding: 4px;

  :focus {
    outline: none;
  }

  svg {
    color: #fff;
  }
`;

export default Button;
