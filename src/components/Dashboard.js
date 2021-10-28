import React, { useState } from 'react'
import Timer from './Timer'
import ActivityTracker from './ActivityTracker'
import './Dashboard.css'
import { StepActionEnum } from '../enums/StepActionEnum'
import { StepTitleEnum } from '../enums/StepTitleEnum'

function Dashboard () {
    
    const [steps, setSteps] = useState([
          {
            title: StepTitleEnum.Focusing,
            timePeriod: 25,
            action: StepActionEnum.Active
          },
          {
            title: StepTitleEnum.Break,
            timePeriod: 5,
            action: StepActionEnum.Disabled
          },
          {
            title: StepTitleEnum.Focusing,
            timePeriod: 25,
            action: StepActionEnum.Disabled
          }
        ]);

    const getActiveStepTimePeriod = () => {
        var step = steps.find(step => step.action === StepActionEnum.Active);
        if (step === undefined) {
            return undefined;
        }
        return step.timePeriod;
    };

    const addActiveStep = () => {
        if (steps === undefined){
            setSteps([]);
        }

        var lastStep = steps[steps.length - 1];
        var addedStep;
        if (lastStep === undefined || lastStep.title === StepTitleEnum.Break) {
            addedStep = {title: StepTitleEnum.Focusing, timePeriod: 25, action: StepActionEnum.Active}
        } else {
            addedStep = {title: StepTitleEnum.Break, timePeriod: 5, action: StepActionEnum.Active}
        }
        setSteps([...steps, addedStep])
    }

    const proceedToTheNextStep = () => {
        var [activeStepIndex, shouldAddOneMoreStep] = [undefined, true];
        var updatedSteps = steps.map((step, stepIndex) => {
            if (step.action === StepActionEnum.Active) {
                activeStepIndex = stepIndex;
                step.action = StepActionEnum.Completed;
            }
            if (activeStepIndex != undefined && (activeStepIndex + 1) === stepIndex && steps.length - 1 > activeStepIndex) {
                steps[stepIndex].action = StepActionEnum.Active;
                shouldAddOneMoreStep = false;
            }

            return step;
        });
        
        if (shouldAddOneMoreStep) {
            var lastStep = steps[steps.length - 1];
            var addedStep;
            if (lastStep === undefined || lastStep.title === StepTitleEnum.Break) {
                addedStep = {title: StepTitleEnum.Focusing, timePeriod: 25, action: StepActionEnum.Active}
            } else {
                addedStep = {title: StepTitleEnum.Break, timePeriod: 5, action: StepActionEnum.Active}
            }
            setSteps(steps => [...updatedSteps, addedStep]);
        }
        else {
            setSteps(steps => updatedSteps);
        }
    }

    return (
        <div className="dashboard">
            <ActivityTracker steps={steps}></ActivityTracker>
            <Timer countdown={getActiveStepTimePeriod()} proceedToTheNextStep={proceedToTheNextStep}></Timer>
        </div>
    );
}

export default Dashboard;