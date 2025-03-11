/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



const Intro = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column'}>
        <Grid item container alignItems={'center'} xs={12} md={6}>
          <Box>
            <Typography variant={'h4'} gutterBottom sx={{ fontWeight: 700 }}>
              How to work with us 
            </Typography>
            <Typography component={'p'}>
              We nurture long-term relationships with our industry partners, 
              and the projects are truly collaborative. 
              We require every company to have a named technology mentor to support the students alongside a UCL supervisor. 
              Partners can create an account for their company by pressing “Sign Up.” Once logged-in, companies can submit idea proposals, which will then be accepted my the IXN team.
              <br />
              <br />
              UCL Computer Science undergrads (Cycle 1) spend 25% of their time in every year of their course working on industry projects alongside their taught modules.
              <br />
              <br />
              Master’s students (Cycle 2) spend three months dedicated to IXN projects as part of their dissertations.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box maxWidth={500} width={1}>
            <img
              src="/pages/about/howitworks1.png"
              alt="Our Tech Stack"
              style={{ maxWidth: '100%', height: 'auto', mixBlendMode: 'multiply' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Intro;
