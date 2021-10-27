import React, { Component } from 'react'
import Timer from './Timer'
import ActivityTracker from './ActivityTracker'
import './Dashboard.css'
import { StepActionEnum } from '../enums/StepActionEnum'
import { StepTitleEnum } from '../enums/StepTitleEnum'

export default class Dashboard extends Component {
    
    state = {
        steps: [
          {
            title: StepTitleEnum.Focusing,
            timePeriod: 25,
            action: StepActionEnum.Completed
          },
          {
            title: StepTitleEnum.Break,
            timePeriod: 5,
            action: StepActionEnum.Active
          },
          {
            title: StepTitleEnum.Focusing,
            timePeriod: 25,
            action: StepActionEnum.Disabled
          }
        ]
    };

    getActiveStepTimePeriod = () => {
        var step = this.state.steps.find(step => step.action === StepActionEnum.Active);
        if (step === undefined) {
            step = this.addActiveStep();
            var steps = this.state.steps;
            steps.push(step);
            this.setState({steps: steps});
        }
        return step.timePeriod;
    };

    addActiveStep = () => {
        var steps = this.state.steps;
        if (steps === undefined){
            steps = [];
        }

        var lastStep = steps[steps.length - 1];
        var addedStep;
        if (lastStep === undefined || lastStep.title === StepTitleEnum.Break) {
            addedStep = {title: StepTitleEnum.Focusing, timePeriod: 25, action: StepActionEnum.Active}
        } else {
            addedStep = {title: StepTitleEnum.Break, timePeriod: 5, action: StepActionEnum.Active}
        }
        return addedStep;
    }

    proceedToTheNextStep = () => {
        var activeStepIndex = this.state.steps.findIndex((step) => step.action === StepActionEnum.Active);

        var steps = this.state.steps;
        steps[activeStepIndex].action = StepActionEnum.Completed;
        if (steps.length - 1 > activeStepIndex) {            
            steps[activeStepIndex + 1].action = StepActionEnum.Active;
        }

        this.setState({steps: steps})
    };

    render() {
        return (
            <div className="dashboard">
                <ActivityTracker steps={this.state.steps}></ActivityTracker>
                <Timer countdown={this.getActiveStepTimePeriod()} proceedToTheNextStep={this.proceedToTheNextStep}></Timer>
            </div>
        )
    }
}
