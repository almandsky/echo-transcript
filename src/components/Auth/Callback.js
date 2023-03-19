import React, { Component } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

class Callback extends Component {
  componentDidMount = () => {
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  };
  render() {
    return (
      <Container component="main" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h2">
                  Loading
              </Typography>
          </Paper>
      </Container>
    );
  }
}

export default Callback;
