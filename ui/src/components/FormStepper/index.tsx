import React, { useContext, useState } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import ContactDetails from "./ContactDetails";
import PersonalDetails from "./PersonalDetails";
import { createClient, getClients } from "../../services/api";
import { StateContext } from "../../store/DataProvider";

type Props = {
  clientDetails: IClient;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

const steps = ["Personal details", "Contact details"];

function FormStepper({ clientDetails, handleChange, handleClose}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const { dispatch } = useContext(StateContext);

  const handleSubmit = () => createClient({ ...clientDetails, id: new Date().toString() }).then((client) => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
    handleClose();
  });

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label} sx={{
              "& .MuiSvgIcon-root.Mui-completed": { color: "green" },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-label": { fontWeight: "bold" },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-label":
              {
                fontWeight: "bold"
              }
            }}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {
        {
          0: <PersonalDetails setActiveStep={setActiveStep} clientDetails={clientDetails} handleChange={handleChange} />,
          1: <ContactDetails setActiveStep={setActiveStep} clientDetails={clientDetails} handleChange={handleChange} handleSubmit={handleSubmit} />
        }[activeStep]
      }
    </>
  );
}

export default FormStepper;