import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// Define constants for better maintainability
const CONTACT_DETAILS = {
  title: 'Contact Information',
  address: [
    'University College London,',
    'Gower Street,',
    'London,',
    'WC1E 6BT',
    'Tel: +44(0) 20 7679 200',
  ],
};


const Footer = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      {/* Address Section */}
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {CONTACT_DETAILS.title}
        </Typography>
        <Box display="flex" gap={2} marginTop={2}>
          <Link href="https://twitter.com/ucl" target="_blank">Twitter</Link>
          <Link href="https://www.linkedin.com/school/university-college-london" target="_blank">LinkedIn</Link>
          <Link href="https://www.instagram.com/ucl" target="_blank">Instagram</Link>
        </Box>

        {CONTACT_DETAILS.address.map((line, index) => (
          <Typography key={index} variant="body1" color="text.secondary">
            {line}
          </Typography>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          © {new Date().getFullYear()} All rights reserved
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;