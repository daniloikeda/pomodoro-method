import React, { useState, useEffect } from "react";
import "./Timer.css";
import ButtonNeumorphism from "./ButtonNeumorphism";
import TimerFinished from "../assets/TimerFinished.wav";

function Timer(props) {
  const [countdown, setCountdown] = useState(0);
  const [timerId, setTimerId] = useState();
  const [timerStopped, setTimerStopped] = useState(true);
  const [remainingCountDown, setRemainingCountDown] = useState(0);
  var timerAudio = new Audio(TimerFinished);
  var seconds = String(remainingCountDown % 60).padStart(2, 0);
  var minutes = String(Math.floor(remainingCountDown / 60)).padStart(2, 0);

  //#region functions

  const playTimerAudio = () => {
    timerAudio.loop = true;
    timerAudio.play();
  }
  
  const pauseTimerAudio = () => {
    timerAudio.pause();
  }

  const handlePlayButtonClick = () => {
    setTimerStopped(false);
    pauseTimerAudio();
    setTimerId(
      setInterval(() => {
        setRemainingCountDown((remainingCountDown) => remainingCountDown - 1);
      }, 1000)
    );
  }

  const handlePauseButtonClick = () => {
    pauseTimerAudio();
    clearInterval(timerId);
    setTimerStopped(true);
  };

  const handleResetButtonClick = () => {
    pauseTimerAudio();
    clearInterval(timerId);
    setTimerStopped(true);
    setRemainingCountDown(countdown);
  };

  const handleNextAction = () => {
    pauseTimerAudio();
    clearInterval(timerId);
    props.proceedToTheNextStep();
  };

  useEffect(() => {
    setTimerStopped(true);
    setCountdown(props.countdown * 60);
    setRemainingCountDown(props.countdown * 60);

  }, [props.countdown]);

  useEffect(() => {
    if (remainingCountDown <= 0) {
      clearInterval(timerId);
      if (timerStopped === false) {
        playTimerAudio();
      }
    }
  }, [remainingCountDown, timerStopped, timerId]);

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
        <ButtonNeumorphism buttonLabel={!timerStopped ? "Pause" : "Play"} icon={!timerStopped ? "pause" : "play"} 
          handleButtonClick={ timerStopped === false ? handlePauseButtonClick : handlePlayButtonClick}>          
        </ButtonNeumorphism>
        <ButtonNeumorphism buttonLabel="Stop" icon="stop" handleButtonClick={handleResetButtonClick}></ButtonNeumorphism>
        <ButtonNeumorphism buttonLabel="Next" icon="chevron right" handleButtonClick={handleNextAction}></ButtonNeumorphism>   
      </div>
    </div>
  );
}

export default Timer;
