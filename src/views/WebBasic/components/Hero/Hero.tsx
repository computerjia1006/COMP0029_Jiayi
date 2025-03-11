
'use client'

import React, {useEffect} from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



const Hero = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  return (
    <Box
      className={'jarallax'}
      data-jarallax
      data-speed="0.2"
      position={'relative'}
      minHeight={{ xs: 400, sm: 500, md: 600 }}
      display={'flex'}
      alignItems={'center'}
      marginTop={-13}
      paddingTop={13}
      id="agency__portfolio-item--js-scroll"
    >
      <Box
        className={'jarallax-img'}
        sx={{
          position: 'absolute',
          objectFit: 'cover',
          /* support for plugin https://github.com/bfred-it/object-fit-images */
          fontFamily: 'object-fit: cover;',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: `
          linear-gradient(
            rgba(255, 255, 255, 0.8), 
            rgba(255, 255, 255, 0.5)
          ),
          url(https://assets.maccarianagency.com/backgrounds/img52.jpg)
        `,
        }}/>

        

      <Grid container spacing={4} sx={{ position: 'relative' , paddingLeft: { xs: 4, sm: 8 },paddingRight: { xs: 4, sm: 8 }}}>
        
        <Grid item container alignItems={'center'} xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}> 

          <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
            <Box marginBottom={2}>
              <Typography
                variant="h2"
                color="text.primary"
                sx={{
                  fontWeight: 700,
                }}
              >
                UCL Computer Science{' '}
                <Typography
                  component={'span'}
                  variant={'inherit'}
                  color={'primary'}
                  sx={{
                  
                    background: `linear-gradient(180deg, transparent 82%, ${alpha(
                      theme.palette.secondary.main,
                      0.3,
                    )} 0%)`,
                  }}
                >
                  IXN Projects
                </Typography>
              </Typography>
            </Box>

            <Box marginBottom={3}>
              <Typography
                variant="h6"
                component="p"
                color="text.secondary"
                sx={{ fontWeight: 400 
                }}
              >
                Our Programme is a win-win for all : students gain customised industry experience.
              </Typography>
            </Box>

          </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
