import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Main from 'layout/WebsiteLayout';
import Container from 'components/Container';
import {
  Hero,
  EventList
} from './components';
import { Search } from '@mui/icons-material';

const Events = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Main colorInvert={true}>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Hero />
        <Container>
          <EventList/>
        </Container>
      </Box>
    </Main>
  );
};

export default Events;
