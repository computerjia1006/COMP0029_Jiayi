import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Main from 'layout/Main';
import Container from 'components/Container';
import {
  Hero,
  FeaturedArticle,
  SearchNews,
  NewsList
} from './components';

const News = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Main colorInvert={true}>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Hero />
        <Container>
          <FeaturedArticle />
        </Container>
        <Container>
          <NewsList/>
        </Container>
      </Box>
    </Main>
  );
};

export default News;
