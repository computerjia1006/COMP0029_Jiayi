import React from 'react';
import Box from '@mui/material/Box';

import Main from 'layout/Main';
import Container from 'components/Container';
import {
  Hero,
  Stories,
  SearchProject
} from './components';

const Project = (): JSX.Element => {
 
  return (
    <Main colorInvert={true}>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Hero />
        <Container paddingTop={'0 !important'}>
          <Stories />
        </Container>
        <Box paddingBottom={{ xs: 2, sm: 3, md: 4 }}>
          <Container>
            <SearchProject /> 
          </Container>
        </Box>
      </Box>
    </Main>
  );
};

export default Project;
