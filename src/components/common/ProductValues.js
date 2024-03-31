import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AlarmIcon from '@mui/icons-material/Alarm';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const itemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

// Create a mapping of icon names to icon components
const iconMapping = {
    Alarm: AlarmIcon,
    DoneAll: DoneAllIcon,
    TrackChanges: TrackChangesIcon,
    PersonOutline: PersonOutlineIcon,
    MobileFriendly: MobileFriendlyIcon,
    NoteAlt: NoteAltIcon,
    Star: StarIcon,
    Work: WorkIcon,
    BeachAccess: BeachAccessIcon,
};

function ProductValues({ bgColor, curveImgSrc, values }) {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: bgColor || 'secondary.light' }}
    >
      <Container sx={{ mt: 10, mb: 15, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src={curveImgSrc || "images/productCurvyLines.png"}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          {values.map((value, index) => {
            const IconComponent = iconMapping[value.iconName]; // Use the mapping
            return (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={itemStyle}>
                  {IconComponent ? <IconComponent sx={{ fontSize: 45 }} /> : null}
                  <Typography variant="h6" sx={{ my: 3 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="h5">
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
