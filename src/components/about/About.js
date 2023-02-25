import React from "react";
import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const AboutPage = () => (
    <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography>
                This is a PWA (Progressive Web App) developed using React.
            </Typography>
            <Typography>
                The Echo Transcript app is using the <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API">Web Speech API</Link> for voice to text transcript.
            </Typography>
        </Paper>
    </Container>
);

export default AboutPage;
