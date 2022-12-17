import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

type ChildProps = {
  setActiveStep: (index: number) => void;
  clientDetails: IClient;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PersonalDetails({ setActiveStep, clientDetails, handleChange }: ChildProps) {
  return (
    <Box margin="20px 10px 0">
      <Stack spacing={2} marginBottom="50px">
        <div>
          <InputLabel shrink htmlFor="firstName">
            First name
          </InputLabel>
          <TextField variant="outlined" name="firstName" id="firstName" sx={{ width: "100%" }} value={clientDetails?.firstName} onChange={handleChange} />
        </div>
        <div>
          <InputLabel shrink htmlFor="lastName">
            Last name
          </InputLabel>
          <TextField variant="outlined" name="lastName" id="lastName" sx={{ width: "100%" }} value={clientDetails?.lastName} onChange={handleChange} />
        </div>
      </Stack>
      <Grid container justifyContent="flex-end">
        <Button variant="contained" sx={{ textTransform: "none", width: "100px", height: "40px" }} disabled={clientDetails?.firstName === '' || clientDetails?.lastName === ''} onClick={() => setActiveStep(1)}>Continue</Button>
      </Grid>
    </Box>
  );
}

export default PersonalDetails;