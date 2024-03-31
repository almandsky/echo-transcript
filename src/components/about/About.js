import React from "react";
import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const AboutPage = () => (
    <Container component="main" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>
            {/* <Typography variant="h6" component='h2' sx={{ m: 1 }}>Introduction</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                This is a React-based PWA (<Link href="https://web.dev/progressive-web-apps/">Progressive Web App</Link>) that supports offline functionality and can be installed on your home screen.
            </Typography> */}
            <Typography variant="h6" component='h2' sx={{ m: 1 }}>Perfect Your Pronunciation</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                The <Link href="/">Echo Scribe</Link> Echo Scribe is your personal pronunciation coach. Speak, listen back, and refine your speech until it&apos;s perfect. Master pronunciation in 37 languages, seamlessly.
            </Typography>
            {/* <Typography variant="h6" component='h2' sx={{ m: 1 }}>Talk to LLM</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                For the <Link href="https://assistant.life-hacks.app/talkgpt">Talk to LLM</Link> feature, your spoken words are first transcribed using the <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API">Web Speech API</Link>. The app then leverages the <Link href="https://openai.com/api/">openAI API</Link> to generate a response to your question, which is then read aloud to you using the <Link href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis">SpeechSynthesis API</Link> Essentially, you can have a conversation with chatGPT by simply speaking to it!
            </Typography> */}
            <Typography variant="h6" component='h2' sx={{ m: 1 }}>Break Free from Delay</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                <Link href="/now">DELAY NO MORE</Link>, Your go-to for overcoming procrastination.
            </Typography>
            <Typography variant="h6" component='h2' sx={{ m: 1 }}>24/7 Personal Mentor</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                <Link href="/mentor">Mentor Notes</Link>, A goal-focused mentor providing personalized, continuous support and advice. Your journey of growth, achievements, and plans, safely stored and accessible whenever you need them.
            </Typography>
            <Typography variant="h6" component='h2' sx={{ m: 1 }}>Contact Us</Typography>
            <Typography component='p' sx={{ m: 1 }}>
                Your feedback is valuable, please contact <Link href="mailto:support@life-hacks.app">support@life-hacks.app</Link>.
            </Typography>
        </Paper>
    </Container>
);

export default AboutPage;
