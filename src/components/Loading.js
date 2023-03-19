import React from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const PageNotFound = () => (
    <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h2">
                Loading
            </Typography>
        </Paper>
    </Container>
);

export default PageNotFound;
