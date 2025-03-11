import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

interface Project {
  id: number;
  title: string;
  image: string;
  companyName: string;
  companySize: string;
  type: string;
  isFeatured: boolean; // Added isFeatured
}

const Stories = (): JSX.Element => {
  const theme = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Filter only featured projects & limit to 3
  const highlightedProjects = projects.filter((project) => project.isFeatured).slice(0, 3);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant="h5" align="center">
          Highlighted Student Projects
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {highlightedProjects.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Box
              component="a"
              href={`/projects/${item.id}`}
              display="block"
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Card sx={{ width: 1, height: 1, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <CardMedia image={item.image} sx={{ height: 240 }} />
                <CardContent>
                  <Typography variant="h6" align="left" color="textPrimary" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle2" align="left" color="textSecondary">
                    {item.companyName} ({item.companySize})
                  </Typography>
                  <Typography variant="subtitle2" align="left" color="primary" sx={{ marginTop: 1 }}>
                    {item.type}
                  </Typography>
                </CardContent>
                <Box flexGrow={1}  />
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                  <Button 
                    size="large"
                    endIcon={
                      <svg
                        width={16}
                        height={16}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    }
                  >
                    Learn more
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Stories;
