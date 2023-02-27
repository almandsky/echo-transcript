import React from "react";
import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const AboutPage = () => (
    <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" component='h2' sx={{ m: 1 }}>Introduction</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                This is a React-based PWA (<Link href="https://web.dev/progressive-web-apps/">Progressive Web App</Link>) that supports offline functionality and can be installed on your home screen. Additionally, it boasts support for 37 languages.
            </Typography>
            <Typography variant="h5" component='h2' sx={{ m: 1 }}>Talk to chatGPT</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                For the <Link href="https://skychen.com/talkgpt">Talk to chatGPT</Link> feature, your spoken words are first transcribed using the <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API">Web Speech API</Link>. The app then leverages the <Link href="https://openai.com/api/">openAI API</Link> to generate a response to your question, which is then read aloud to you using the <Link href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis">SpeechSynthesis API</Link> Essentially, you can have a conversation with chatGPT by simply speaking to it!
            </Typography>
            <Typography variant="h5" component='h2' sx={{ m: 1 }}>Talk to yourself</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                The <Link href="https://skychen.com/">Echo Transcript</Link> page utilizes the the <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API">Web Speech API</Link> to generate a voice-to-text transcript of your spoken words. You can also hear your own voice.
            </Typography>
        </Paper>
    </Container>
);

export default AboutPage;
