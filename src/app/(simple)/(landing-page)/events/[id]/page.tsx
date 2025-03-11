
'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import Container from 'components/Container';
import Main from 'layouts/Main';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  content: string;
  summary?: string;
  description?: string;
  imageURL?: string;
  isLive: boolean;
  createdAt: string;
  updatedAt: string;
  openTo: string;
  availability?: string;
  cost?: number;
  venue?: string;
  organiserName: string;
  organiserEmail: string;
}

const EventDetailPage = ({ params }: { params: { id: string } }): JSX.Element => {
  const theme = useTheme();
  const [event, setEvent] = React.useState<Event | null>(null);

  React.useEffect(() => {
    // Here you would fetch the event data using the id
    // For now we'll just simulate loading
    const loadEvent = async () => {
      // Replace this with actual API call
      // const response = await fetch(`/api/events/${params.id}`);
      // const data = await response.json();
      // setEvent(data);
    };
    loadEvent();
  }, [params.id]);

  if (!event) {
    return (
      <Main>
        <Box bgcolor={'alternate.main'} position={'relative'}>
          <Container>
            <Typography>Loading...</Typography>
          </Container>
        </Box>
      </Main>
    );
  }

  return (
    <Main>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box marginBottom={4}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {event.title}
                </Typography>
                {event.summary && (
                  <Typography variant="h6" color="text.secondary">
                    {event.summary}
                  </Typography>
                )}
              </Box>
              <Box marginBottom={4}>
                <Card>
                  <CardMedia
                    sx={{ height: 400 }}
                    image={event.imageURL || 'https://via.placeholder.com/400'}
                    title={event.title}
                  />
                </Card>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Event Details
                </Typography>
                <Typography>{event.content}</Typography>
                {event.description && (
                  <Box marginTop={2}>
                    <Typography>{event.description}</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: 2, marginBottom: 2 }}>
                <Box marginBottom={2}>
                  <AccessTimeIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body1">
                    {new Date(event.startTime).toLocaleString()} -{' '}
                    {new Date(event.endTime).toLocaleString()}
                  </Typography>
                </Box>
                {event.venue && (
                  <Box marginBottom={2}>
                    <LocationOnIcon sx={{ marginRight: 1 }} />
                    <Typography variant="body1">{event.venue}</Typography>
                  </Box>
                )}
                <Box marginBottom={2}>
                  <PersonIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body1">{event.organiserName}</Typography>
                </Box>
                <Box marginBottom={2}>
                  <EmailIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body1">{event.organiserEmail}</Typography>
                </Box>
                {event.cost !== undefined && (
                  <Box marginBottom={2}>
                    <MonetizationOnIcon sx={{ marginRight: 1 }} />
                    <Typography variant="body1">£{event.cost}</Typography>
                  </Box>
                )}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop={2}
                >
                  Open to: {event.openTo}
                  {event.availability && ` • ${event.availability}`}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default EventDetailPage;
