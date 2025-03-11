'use client'

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layout/Main';
import Container from 'components/Container';
import {
  Statistics,
  Hero,
  Partners,
} from './components';

const WebBasic = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Main>
      <Box
        position={'relative'}
      >
        <Hero />
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            width: '100%',
            marginBottom: theme.spacing(-1),
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>


      <Container>
        <Statistics />
      </Container>

      <Box
        position={'relative'}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth={1} paddingTop={'5 !important'}>
          <Partners />
        </Container>
      </Box>

    </Main>
  );
};

export default WebBasic;
