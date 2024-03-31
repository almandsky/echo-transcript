import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';

function TopModule({ title, subtitle, buttonText, buttonLink, backgroundImage }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: '60vh', // Adjust the height as needed
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(3),
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h3'} color="primary">
        {title}
      </Typography>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} color="primary" sx={{ my: 3 }}>
        {subtitle}
      </Typography>
      <Button sx={{ borderRadius: '20px' }} variant="contained" color="primary" href={buttonLink}>
        {buttonText}
      </Button>
      {/* Add more buttons or text as needed */}
    </Box>
  );
}

export default TopModule;

// Usage example:
// <TopModule
//   title="Your podcast's publishing platform"
//   subtitle="Record & upload your podcast. We'll distribute it to Google Podcasts"
//   buttonText="Start 14-day free trial"
//   buttonLink="/trial"
//   backgroundImage="/path/to/your/background-image.jpg"
// />
