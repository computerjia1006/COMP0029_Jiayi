import React from 'react';
import Divider from '@mui/material/Divider';

import Main from 'layout/WebsiteLayout';
import Container from 'components/Container';
import {
  Hero,
  Intro,
  Faq,
} from './components';

const About = (): JSX.Element => {
  return (
    <Main colorInvert={true}>
      <Hero />
      <Container>
        <Intro />
      </Container>
      <Container maxWidth={800} paddingY={'0 !important'}>
        <Divider />
      </Container>
      <Container>
        <Faq />
      </Container>
    </Main>
  );
};

export default About;
