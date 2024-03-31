import * as React from 'react';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';

// Set default values for props
const defaultProps = {
  backgroundImage: 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400',
  backgroundColor: '#7fc7d9', // Average color of the background image.
  title: 'Upgrade your Sundays',
  subtitle: 'Enjoy secret offers up to -70% off the best luxury hotels every Sunday.',
  buttonText: 'Register',
  buttonColor: 'secondary', // Default button color
  buttonUrl: 'https://chat.openai.com/g/g-CgllffGPG-mentor-notes',
  footerText: ''
};

export default function ProductHero(props) {
  // Apply default props if not provided
  const {
    backgroundImage,
    backgroundColor,
    title,
    subtitle,
    buttonText,
    buttonColor,
    buttonUrl,
    footerText
  } = { ...defaultProps, ...props };

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: backgroundColor, // Use the backgroundColor prop
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h3" marked="center">
        {title}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        {subtitle}
      </Typography>
      <Button
        color={buttonColor} // Use the buttonColor prop
        variant="contained"
        size="large"
        component="a"
        href={buttonUrl}
        target="_blank"
        sx={{ minWidth: 200 }}
      >
        {buttonText}
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        {footerText}
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.defaultProps = defaultProps;


{/* <ProductHero
  title="New Adventure Awaits"
  subtitle="Join us to explore the unknown."
  buttonText="Get Started"
  buttonColor="primary"
  backgroundImage="https://example.com/new-adventure.jpg"
  backgroundColor="#5c6bc0"
/> */}
