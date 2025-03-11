'use client';

import React, { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const mock = [
  {
    title: 600,
    subtitle: '600 + collaboration of industrial projects up to date ',
    suffix: '+',
  },
  {
    title: 200,
    subtitle: '200 + partners across different sectors ',
    suffix: '+',
  },
  {
    title: 8,
    subtitle: 'more than 8 years of industry experience ',
    suffix: '>',
  },
];

const Statistics = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setViewPortEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid item xs={12} md={6} data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={4}>
            <Typography variant={'h4'} gutterBottom sx={{ fontWeight: 700 }}>
              Statistics
            </Typography>
            <Typography component={'p'} color={'text.secondary'}>
              Leading companies trust us to develop software. These are the
              statistics up to date.
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              {mock.map((item, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <Typography variant="h4" color={'primary'} gutterBottom>
                    <Box fontWeight={600} ref={ref}>
                      <CountUp
                        duration={2}
                        end={viewPortEntered ? item.title : 0}
                        start={0}
                        suffix={item.suffix}
                      />
                    </Box>
                  </Typography>
                  <Typography component="p">{item.subtitle}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item container justifyContent={'center'} xs={12} md={6}>
          <Box height={1} width={1} maxHeight={800}>
            <Box
              component="div"
              sx={{
                position: 'relative',
                paddingTop: '56.25%', // Aspect ratio for 16:9
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/ndOgv9-s6l8?si=VlPJVQBQmwps5UNd"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
