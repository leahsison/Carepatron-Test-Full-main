import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ChildProps = {
  setActiveStep: (index: number) => void;
  clientDetails: IClient;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

function ContactDetails({ setActiveStep, clientDetails, handleChange, handleSubmit }: ChildProps) {
  return (
    <Box margin="20px 10px 0">
      <Stack spacing={2} marginBottom="50px">
        <div>
          <InputLabel shrink htmlFor="email">
            Email
          </InputLabel>
          <TextField variant="outlined" name="email" id="email" sx={{ width: '100%' }} value={clientDetails?.email} onChange={handleChange} />
        </div>
        <div>
          <InputLabel shrink htmlFor="phoneNumber">
            Phone number
          </InputLabel>
          <TextField variant="outlined" name="phoneNumber" id="phoneNumber" sx={{ width: '100%' }} value={clientDetails?.phoneNumber} onChange={handleChange} />
        </div>
      </Stack>
      <Grid container justifyContent="space-between">
        <Button sx={{ textTransform: "none" }} onClick={() => setActiveStep(0)}>
          <ArrowBackIcon fontSize="inherit"/>
          <Box ml={1}>Back</Box>
        </Button>
        <Button variant="contained" sx={{ textTransform: "none", height: "40px" }} disabled={clientDetails?.email === '' || clientDetails?.phoneNumber === ''} onClick={handleSubmit}>
          Create client
        </Button>
      </Grid>
    </Box>
  );
}

export default ContactDetails;