import React from "react";
import styled from "styled-components";

const StatusBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
  user-select: none;
  padding: 8px;
`;

const StatusBar = ({ textColor, backgroundColor, className }) => {
  const getTime = () => {
    const d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();

    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;

    return `${h}:${m}`;
  };

  const [time, setTime] = React.useState(getTime());

  React.useEffect(() => {
    const interval = setInterval(
      () => {
        setTime(getTime());
      },
      1000,
      true
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <StatusBarWrapper
      className={className}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      <p>mappedin</p>
      <p>{time}</p>
    </StatusBarWrapper>
  );
};

export default StatusBar;
