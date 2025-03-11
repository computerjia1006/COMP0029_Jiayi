
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState, useEffect } from 'react';

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

const EventsList = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Typography>Loading events...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant={'h4'} align={'left'}>
          All Events
        </Typography>
        <Typography
          align={'left'}
          color={'text.secondary'}
          sx={{ textTransform: 'uppercase' }}
          variant={'subtitle2'}
          fontWeight={600}
        >
          Here is our Events List
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
            <InputLabel id="event-search-label">Search Events</InputLabel>
            <Select labelId="event-search-label" label="Search Events">
              <MenuItem value="">
                <em>All events</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} paddingBottom={3}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="event-sort-label">
              Sort By Date
            </InputLabel>
            <Select
              labelId="event-sort-label"
              label="Sort By"
            >
              <MenuItem value="">
                <em>Default</em>
              </MenuItem>
              <MenuItem value={'latest'}>Latest First</MenuItem>
              <MenuItem value={'oldest'}>Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Container>
        <Grid spacing={isMd ? 2 : 2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={isMd ? 4 : 2} direction="column">
              {events.map((event, index) => (
                <Grid
                  item
                  xs={12}
                  key={event.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  data-aos-offset={100}
                  data-aos-duration={600}
                >
                  <Box
                    component={Card}
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                  >
                    <CardMedia
                      title={event.title}
                      image={event.imageURL}
                      sx={{
                        height: { xs: 240, sm: 'auto' },
                        width: { xs: 1, sm: 300 },
                      }}
                    />
                    <CardContent>
                      <Box>
                        <Typography variant="h6" gutterBottom color="text.primary">
                          {event.title}
                        </Typography>
                        <Box display="flex" alignItems="center" marginY={1}>
                          <CalendarTodayIcon sx={{ marginRight: 1 }} />
                          <Typography variant="body2">
                            {new Date(event.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" marginY={1}>
                          <AccessTimeIcon sx={{ marginRight: 1 }} />
                          <Typography variant="body2">
                            {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" marginY={1}>
                          <LocationOnIcon sx={{ marginRight: 1 }} />
                          <Typography variant="body2">{event.venue}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" marginTop={2}>
                          {event.description}
                        </Typography>
                      </Box>
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button href={`/events/${event.id}`}>Read More</Button>
                      </CardActions>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent={'center'} xs={12} paddingTop={5}>
          <Pagination count={10} size={'large'} color="primary" />
        </Grid>
      </Container>
    </Box>
  );
};

export default EventsList;