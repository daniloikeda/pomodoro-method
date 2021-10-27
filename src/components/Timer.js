import React, { Component } from "react";
import './Timer.css'

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timerStopped: true,
      countdown: props.countdown,
      remainingCountDown: props.countdown
    };
  }

  updateState() {
    var reloadedState = {
      timerStopped: true,
      countdown: this.props.countdown,
      remainingCountDown: this.props.countdown
    };
    this.setState(reloadedState);
  }

  //#region functions
  handlePlayButtonClick = () => {
    this.setState({ timerStopped: false });

    this.timerId = setInterval(() => {
      this.setState({ remainingCountDown: this.state.remainingCountDown - 1 });
      if (this.state.remainingCountDown < 0) {
        clearInterval(this.timerId);
        this.props.proceedToTheNextStep();
        this.updateState();
      }
    }, 1000);
  };

  handlePauseButtonClick = () => {
    clearInterval(this.timerId);
    this.setState({ timerStopped: true });
  };

  handleResetButtonClick = () => {
    clearInterval(this.timerId);
    this.setState({timerStopped: true, remainingCountDown: this.state.countdown});
  };

  //#endregion

  render() {
    const { remainingCountDown } = this.state;
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
              this.state.timerStopped === false
                ? this.handlePauseButtonClick
                : this.handlePlayButtonClick
            }
          >
            <i
              className={!this.state.timerStopped ? "pause icon" : "play icon"}
            ></i>
            {!this.state.timerStopped ? "Pause" : "Play"}
          </button>
          <button
            className="ui labeled icon button"
            onClick={this.handleResetButtonClick}
          >
            <i className="stop icon"></i>
            Stop
          </button>
        </div>
      </div>
    );
  }
}
