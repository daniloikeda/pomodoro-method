import React from "react";
import "./ActivityTracker.css";

const ActivityTracker = ({ steps }) => {
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
};

export default ActivityTracker;