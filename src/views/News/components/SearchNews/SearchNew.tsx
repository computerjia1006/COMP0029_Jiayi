import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';

export const mock = [
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Apple',
    type: 'Software Engineering',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Samsung',
    type: 'Machine Learning',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Meta',
    type: 'Data Science',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Santander',
    type: 'Software Engineering',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Amazon',
    type: 'Machine Learning',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Oracle',
    type: 'Data Science',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Boots',
    type: 'Data Science',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyName: 'Palantir',
    type: 'Machine Learning',
  },
];

const searchNews = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant={'h4'} align={'left'}>
          All Project
        </Typography>
        <Typography
          align={'left'}
          color={'text.secondary'}
          sx={{ textTransform: 'uppercase' }}
          variant={'subtitle2'}
          fontWeight={600}
        >
          Projects done by students 
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        justifyContent="space-between"
        sx={{
          '.MuiOutlinedInput-root': {
            background: theme.palette.background.paper,
          },
        }}
      >
        <Grid item xs={12} md={4}>
          
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">Search Input Field</InputLabel>
            <Select labelId="career-listing__jobs-role--label" label="Roles">
              <MenuItem value="">
                <em>All roles</em>
              </MenuItem>
              <MenuItem value={'design'}>Design</MenuItem>
              <MenuItem value={'engineering'}>Engineering</MenuItem>
              <MenuItem value={'product'}>Product</MenuItem>
              <MenuItem value={'support'}>Support</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">
              Sort By 
            </InputLabel>
            <Select
              labelId="career-listing__jobs-role--label"
              label="Locations"
            >
              <MenuItem value="">
                <em>Default</em>
              </MenuItem>
              <MenuItem value={'Recent Date'}>Latest Dates</MenuItem>
              <MenuItem value={'A-Z'}>Alphabetical Order</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        flex={'1 1 100%'}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        marginY={4}
      >
        <Box marginBottom={{ xs: 1, sm: 0 }}>
        </Box>
        <Box
          paddingY={1 / 2}
          paddingX={1}
          bgcolor={'secondary.main'}
          borderRadius={2}
          marginRight={1}
        >
          <Typography
            variant={'caption'}
            fontWeight={700}
            sx={{ color: 'common.black' }}
          >
            {mock.length} openings
          </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={4}>
          {mock.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia image={item.media}
                  sx={{
                    height: 240}}/>
                <CardContent>
                  <Typography variant={'h7'} color="textSecondary" gutterBottom>
                    {item.companyName}
                  </Typography>
                  <Typography variant={'body2'} color="textSecondary">
                    {item.type}
                  </Typography>
                </CardContent>
                <Box flexGrow={1} />
                <CardActions>
                  <Button
                    size="small"
                    endIcon={
                      <svg
                        width={16}
                        height={16}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    }
                  >
                    Learn more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item container paddingTop={5} justifyContent={'center'} xs={12}>
          <Pagination count={10} size={'large'} color="primary" />
        </Grid>
      </Box>
    </Box>
    
  );
};

export default searchNews;
