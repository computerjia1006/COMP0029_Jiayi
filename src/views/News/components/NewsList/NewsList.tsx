import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  isFeatured: boolean;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const NewsList = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [news, setNews] = useState<News[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news?isPublished=true&sort=${sortOrder}`);
        const data = await response.json();
        setNews(data.filter((item: News) => !item.isFeatured));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [sortOrder]);

  useEffect(() => {
    const filtered = news.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchTerm, news]);

  
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant={'h4'} align={'left'}>
          All News
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{
          '.MuiOutlinedInput-root': {
            background: theme.palette.background.paper,
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search news"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel>Sort By Date</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Sort By Date"
            >
              <MenuItem value="desc">Latest First</MenuItem>
              <MenuItem value="asc">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={isMd ? 4 : 2}>
        {filteredNews.map((item) => (
          <Grid
            item
            xs={12}
            key={item.id}
            data-aos="fade-up"
            data-aos-delay={200}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box
              component={Card}
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
            >
              <CardMedia
                image={item.imageUrl || '/placeholder-news.jpg'}
                title={item.title}
                sx={{
                  height: { xs: 240, sm: 'auto' },
                  width: { xs: 1, sm: 300 },
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box flex={1} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6"  color="text.primary">
                    {item.title}
                  </Typography>
                </Box>  
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.summary}
                  </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon />
                  <Typography variant="subtitle1" color="text.secondary" >
                    {formatDate(item.createdAt)} 
                  </Typography>
                </Box>  
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button 
                    component={'a'}
                    href={`/news/${item.id}`}
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsList;