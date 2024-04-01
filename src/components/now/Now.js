import React from 'react';
import { Container, Paper, Typography, Button, Grid, Box, CardMedia } from '@mui/material';
import PromoteCard from '../common/PromoteCard';
import ImageCard from '../common/ImageCard';
import TopModule from '../common/TopModule';
import Hero from '../common/Hero';
import ProductHero from '../common/ProductHero';
import ProductValues from '../common/ProductValues';
import DistributionIcon from '@mui/icons-material/LocalShipping';
import Link from "@mui/material/Link";

const Now = () => (
    <Container component="main">
        {/* <Box sx={{ my: 4 }}>
            <Typography variant="h2" component='h1' gutterBottom>
                Mentor Notes
            </Typography>
            <Typography variant="h5" component='h2'>
                Guided by AI, personalized mentorship for your success.
            </Typography>
        </Box> */}
        {/* <TopModule
            title="Mentor Notes"
            subtitle="Guided by AI, personalized mentorship for your success"
            buttonText="Chat with DELAY NO MORE"
            buttonLink="https://chat.openai.com/g/g-5vaLvM0rI-delay-no-more"
            backgroundImage="images/delay-no-more.jpg"
        /> */}

        {/* <Hero
            mainText="Our latest"
            highlightText="products"
            description="Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. Elevate your experience with top-tier features and services."
            buttonText="Start now"
            emailPlaceholder="Your email address"
            termsLink="#"
            lightImageUrl="images/delay-no-more.jpg"
            darkImageUrl="images/delay-no-more.jpg"
        /> */}

        <ProductHero
            title="DELAY NO MORE"
            subtitle="Your go-to for overcoming procrastination."
            buttonText="Chat with 'DELAY NO MORE' GPT"
            buttonColor="primary"
            backgroundImage="images/delay-no-more.jpg"
            backgroundColor="#5c6bc0"
            buttonUrl="https://chat.openai.com/g/g-5vaLvM0rI-delay-no-more"
            footerText="ChatGPT Plus Required. Web version coming soon."
        />

        <ProductValues
            bgColor="#fff"
            // bgColor="rgba(0, 0, 100, 0.2)"
            curveImgSrc="images/productCurvyLines.png"
            values={[
                {
                    iconName: "Alarm",
                    title: "Break Free from Delay",
                    description: "Unleash your potential. We empowers you to act decisively, leaving procrastination behind.",
                },
                {
                    iconName: "DoneAll",
                    title: "Goals Achieved",
                    description: "Set, track, and conquer your goals with precision. We make your aspirations achievable.",
                },
                {
                    iconName: "TrackChanges",
                    title: "Track Progress Seamlessly",
                    description: "We remembers every step of your journey, enabling you to reflect and adjust with ease.",
                },
            ]}
        />


        {/* <Grid container direction="row-reverse" spacing={2} alignItems="stretch">
            <Grid item xs={12} sm={6} md={8}>
                <Paper elevation={0}>
                    <CardMedia
                        component="img"
                        image="images/delay-no-more.jpg" // Replace with your image path
                        alt="Personalization"
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', p: 2, height: '100%' }}>
                    <Typography variant="h5" component='h3'>Personalization</Typography>
                    <Typography sx={{ mb: 2 }}>
                        Your goals, tasks, and knowledge, all in one place, tailored just for you.
                    </Typography>
                    <Typography variant="h5" component='h3'>Convenience</Typography>
                    <Typography sx={{ mb: 2 }}>
                        Accessible mentorship anytime, anywhere, at your fingertips.
                    </Typography>
                    <Typography variant="h5" component='h3'>Persistent Storage</Typography>
                    <Typography sx={{ mb: 2 }}>
                        Your journey of growth, achievements, and plans, safely stored and accessible whenever you need them.
                    </Typography>
                </Paper>
            </Grid>
            


            <Grid item xs={12} sm={6} md={8}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h5" component='h3'>Personalization</Typography>
                    <Typography>
                        Your goals, tasks, and knowledge, all in one place, tailored just for you.
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h5" component='h3'>Convenience</Typography>
                    <Typography>
                        Accessible mentorship anytime, anywhere, at your fingertips.
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h5" component='h3'>Persistent Storage</Typography>
                    <Typography>
                        Your journey of growth, achievements, and plans, safely stored and accessible whenever you need them.
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <PromoteCard
                    backgroundColor="#fff"
                    titleText="My Custom Title"
                    bodyText="Custom body text goes here"
                    // buttonText="My Custom Button Text"
                    // buttonLink="https://www.customlink.com"
                    // tagColor="#ff5722"
                    // tagIcon={DistributionIcon}
                    shadow={true}
                    tagText="My Custom Tag"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ImageCard
                    alt="test image"
                    src="images/delay-no-more.jpg"
                />
            </Grid>

        </Grid> */}

        <Grid container direction="row-reverse" spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={6} md={8}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <ImageCard
                        alt="DELAY NO MORE on desktop and mobile"
                        src="images/delay-no-more-device.png"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        variant="contained"
                        component="a"
                        href="https://chat.openai.com/g/g-5vaLvM0rI-delay-no-more"
                        target="_blank"
                        color="primary"
                        sx={{ borderRadius: '20px', textTransform: 'none' }}
                        // size="large"
                    >
                        Chat with &apos;DELAY NO MORE&apos; GPT
                    </Button>
                </Box>

                <Box sx={{ my: 4 }}>
                    <Typography variant="body2" color="text.secondary" align="center">
                    Your feedback is valuable, please contact <Link href="mailto:support@life-hacks.app">support@life-hacks.app</Link>.
                    </Typography>
                    {/* <Typography variant="h6" component='h2' sx={{ m: 1 }}>Contact Us</Typography>
                    <Typography component='p' sx={{ m: 1 }}>
                        Your feedback is valuable, please contact <Link href="mailto:support@life-hacks.app">support@life-hacks.app</Link>.
                    </Typography> */}
                </Box>
            </Grid>
        </Grid>

    </Container>
);

export default Now;
