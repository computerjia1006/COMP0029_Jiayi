
'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import Container from 'components/Container';
import Main from 'layouts/Main';
import { useParams } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  image: string | null;
  video: string | null;
  date: string;
  companyName: string;
  companySize: string;
  type: string;
  details: string;
  program: string;
  isFeatured: boolean;
}

const ProjectDetails = (): JSX.Element => {
  const theme = useTheme();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (!project) {
    return (
      <Main>
        <Box bgcolor={'alternate.main'}>
          <Container paddingY={{ xs: 2, sm: 2.5 }}>
            <Typography>Loading...</Typography>
          </Container>
        </Box>
      </Main>
    );
  }

  return (
    <Main>
      <Box bgcolor={'alternate.main'}>
        <Container paddingY={{ xs: 2, sm: 2.5 }}>
          <Box>
            <Typography variant={'h4'} fontWeight={700} gutterBottom>
              {project.title}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Card>
                  {project.video ? (
                    <Box
                      component="iframe"
                      src={project.video}
                      height={400}
                      width="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <CardMedia
                      image={project.image || '/placeholder.jpg'}
                      sx={{
                        height: 400,
                        width: '100%',
                      }}
                    />
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography variant={'subtitle1'} fontWeight={700}>
                    Project Details
                  </Typography>
                  <Box marginY={2}>
                    <Typography variant={'subtitle2'}>Date:</Typography>
                    <Typography color="text.secondary">
                      {new Date(project.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box marginY={2}>
                    <Typography variant={'subtitle2'}>Program:</Typography>
                    <Typography color="text.secondary">
                      {project.program}
                    </Typography>
                  </Box>
                  <Box marginY={2}>
                    <Typography variant={'subtitle2'}>Company:</Typography>
                    <Typography color="text.secondary">
                      {project.companyName} ({project.companySize})
                    </Typography>
                  </Box>
                  <Box marginY={2}>
                    <Typography variant={'subtitle2'}>Type:</Typography>
                    <Typography color="text.secondary">
                      {project.type}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography variant={'subtitle1'} fontWeight={700} gutterBottom>
                    Project Description
                  </Typography>
                  <Typography color="text.secondary">
                    {project.details}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default ProjectDetails;
