import React, { useState, useEffect } from "react";
import { useCallback } from "react/cjs/react.development";
import "./Timer.css";

function Timer(props) {
  const _MAX_SECONDS = 60;
  const [countdown, setCountdown] = useState(props.countdown);
  const [timerId, setTimerId] = useState();
  const [timerStopped, setTimerStopped] = useState(true);
  const [remainingCountDown, setRemainingCountDown] = useState(props.countdown);

  //#region functions
  const handlePlayButtonClick = () => {
    setTimerStopped(false);

    setTimerId(
      setInterval(() => {
        setRemainingCountDown((remainingCountDown) => remainingCountDown - 1);
      }, 1000)
    );
  }

  const handlePauseButtonClick = () => {
    clearInterval(timerId);
    setTimerStopped(true);
  };

  const handleResetButtonClick = () => {
    clearInterval(timerId);
    setTimerStopped(true);
    setRemainingCountDown(countdown);
  };

  const handleNextAction = useCallback(() => {
    clearInterval(timerId);
    props.proceedToTheNextStep();
  }, [props, timerId]);
  
  useEffect(() => {
    setTimerStopped(true);
    setCountdown(props.countdown);
    setRemainingCountDown(props.countdown);

  }, [props.countdown]);

  useEffect(() => {
    if (remainingCountDown < 0) {
      handleNextAction();
    }
  }, [remainingCountDown, handleNextAction]);

  return (
    <div className="timer">
      <div className="ui horizontal statistic">
        <div className="value">{remainingCountDown}</div>
        <div className="label">minutes</div>
      </div>
      <div className="timer-buttons-wrap">
        <button
          className="ui labeled icon button"
          onClick={
            timerStopped === false
              ? handlePauseButtonClick
              : handlePlayButtonClick
          }
        >
          <i className={!timerStopped ? "pause icon" : "play icon"}></i>
          {!timerStopped ? "Pause" : "Play"}
        </button>
        <button
          className="ui labeled icon button"
          onClick={handleResetButtonClick}
        >
          <i className="stop icon"></i>
          Stop
        </button>
        <button className="ui labeled icon button" onClick={handleNextAction}>
          <i className="chevron right icon"></i>
          Next
        </button>
      </div>
    </div>
  );
}

export default Timer;
