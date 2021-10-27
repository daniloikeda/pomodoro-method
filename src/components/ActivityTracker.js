import React, { Component } from "react";
import "./ActivityTracker.css";

export default class ActivityTracker extends Component {
  render() {
    const { steps } = this.props;
    return (
      <div className="activity-tracker">
        <div className="ui steps">
          {steps &&
            steps.map((step, index) => (
              <div className={step.action + " step"} key={index}>
                <i
                  aria-hidden="true"
                  className={
                    step.title === "Focusing"
                      ? "circle outline icon"
                      : "coffee icon"
                  }
                ></i>
                <div className="content">
                  <div className="title">{step.title}</div>
                  <div className="description">{step.timePeriod} minutes</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
