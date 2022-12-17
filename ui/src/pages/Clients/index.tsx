import React, { memo, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormDialog from "../../components/FormDialog";
import Grid from "@mui/material/Grid";
import InputAdornment from '@mui/material/InputAdornment';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import SearchIcon from '@mui/icons-material/Search';

import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;
  const [open, setOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState<IClient>({ id: '', firstName: '', lastName: '', email: '', phoneNumber: ''});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IClient[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setClientDetails({ id: '', firstName: '', lastName: '', email: '', phoneNumber: '' })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value })
  };

  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setSearchResults(clients.filter(client => client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || client.lastName.toLowerCase().includes(searchQuery.toLowerCase())))
    }
  }, [clients, searchQuery])

  return (
    <Page>
      <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "start", marginBottom: "20px" }}>
        Clients
      </Typography>
      <Grid container justifyContent="space-between">
        <TextField
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            background: "#FFF",
            borderRadius: 2,
            width: 300,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ textTransform: "none" }} disableElevation onClick={handleOpen}>
          Create new client
        </Button>
      </Grid>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={searchQuery ? searchResults : clients} />
      </Paper>
      <FormDialog open={open} clientDetails={clientDetails} handleChange={handleChange} handleClose={handleClose} />
    </Page>
  );
}

export default memo(Clients);
