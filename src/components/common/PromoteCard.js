import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Link, Chip } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ backgroundColor, shadow }) => ({
    backgroundColor: backgroundColor || '#fff', // default background color
    padding: '32px', // equivalent to theme.spacing(4)
    borderRadius: '12px', // standard border radius
    // width: '100%'
    boxShadow: shadow ? '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)' : '',
}));

const PromoteCard = ({
    backgroundColor,
    titleText = 'Publish your podcast everywhere',
    bodyText = 'Get your podcast on Apple Podcasts, Spotify, Google Podcasts, Overcast, Pocket Casts, and many more!',
    buttonText,
    buttonLink,
    shadow = null,
    tagColor = 'primary',
    tagIcon: TagIcon,
    tagText = 'Distribution',
}) => {
    return (
        <StyledBox backgroundColor={backgroundColor} shadow={shadow}>
            <Chip
                icon={TagIcon ? <TagIcon /> : undefined}
                label={tagText}
                color={tagColor}
                sx={{ marginBottom: 2, p: 2, backgroundColor: tagColor }}
            />
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                {titleText}
            </Typography>
            <Typography variant="body1">{bodyText}</Typography>
            {buttonText && buttonLink && <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                <Link href={buttonLink} color="inherit" underline="none">
                    {buttonText}
                </Link>
            </Button>}
        </StyledBox>
    );
};

PromoteCard.propTypes = {
    backgroundColor: PropTypes.string,
    titleText: PropTypes.string,
    bodyText: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    tagColor: PropTypes.string,
    tagIcon: PropTypes.elementType,
    tagText: PropTypes.string,
    margin: PropTypes.string,
    shadow: PropTypes.boolean
};

export default PromoteCard;
