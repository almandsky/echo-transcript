import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'; // Import PropTypes

function ImageCard({ src, alt }) {
  return (
    <Box
      component="img"
      sx={{
        height: 'auto',
        width: '100%',
        maxHeight: { xs: 300, md: 600 },
        maxWidth: { xs: 300, md: 600 },
      }}
      alt={alt}
      src={src}
    />
  );
}

// Define propTypes for ImageCard
ImageCard.propTypes = {
  src: PropTypes.string.isRequired, // src is a required string
  alt: PropTypes.string.isRequired, // alt is a required string
};

export default ImageCard;
