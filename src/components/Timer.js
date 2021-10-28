import React, { useState, useEffect } from "react";
import { useCallback } from "react/cjs/react.development";
import "./Timer.css";

function Timer(props) {
  const [countdown, setCountdown] = useState(0);
  const [timerId, setTimerId] = useState();
  const [timerStopped, setTimerStopped] = useState(true);
  const [remainingCountDown, setRemainingCountDown] = useState(0);

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

  const seconds = String(remainingCountDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(remainingCountDown / 60)).padStart(2, 0);

  const handleNextAction = useCallback(() => {
    clearInterval(timerId);
    props.proceedToTheNextStep();
  }, [props, timerId]);
  
  useEffect(() => {
    setTimerStopped(true);
    setCountdown(props.countdown * 60);
    setRemainingCountDown(props.countdown * 60);

  }, [props.countdown]);

  useEffect(() => {
    if (remainingCountDown < 0) {
      handleNextAction();
    }
  }, [remainingCountDown, handleNextAction]);

  return (
    <div className="timer">
      <div className="countdown">
        <div className="ui small statistic">
          <div className="value">{minutes}</div>
          <div className="label">minutes</div>
        </div>
        <div className="ui small statistic">
          <div className="value">{seconds}</div>
          <div className="label">seconds</div>
        </div>
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
