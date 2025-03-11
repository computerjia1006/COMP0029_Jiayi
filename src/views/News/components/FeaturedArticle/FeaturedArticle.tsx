import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  isFeatured: boolean;
}

const FeaturedArticle = (): JSX.Element => {
  const theme = useTheme();
  const [featuredNews, setFeaturedNews] = useState<News | null>(null);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const response = await fetch('/api/news?isFeatured=true&published=true');
        const data = await response.json();

        if (data && data.length > 0) {
          setFeaturedNews(data[0]); // Get the first featured article
        }
      } catch (error) {
        console.error('Error fetching featured news:', error);
      }
    };

    fetchFeaturedNews();
  }, []);

  if (!featuredNews) return null;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Box>
      <Box
        component={'a'}
        href={`/news/${featuredNews.id}`}
        display={'block'}
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
        <Box
          component={Card}
          width={1}
          height={1}
          boxShadow={4}
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          sx={{ backgroundImage: 'none' }}
        >
          <Box
            sx={{
              width: { xs: 1, md: '50%' },
              position: 'relative',
            }}
          >
            <Box
              component={'img'}
              loading="lazy"
              height={1}
              width={1}
              src={featuredNews.imageUrl || '/placeholder-news.jpg'}
              alt={featuredNews.title}
              sx={{
                objectFit: 'cover',
                maxHeight: 300,
                filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              }}
            />
            <Chip
              label="Featured"
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                bgcolor: 'background.paper',
              }}
            />
          </Box>
          <CardContent
            sx={{
              position: 'relative',
              width: { xs: 1, md: '50%' },
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant={'h5'} gutterBottom>
                {featuredNews.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {formatDate(featuredNews.createdAt)} 
              </Typography>
              <Typography color="text.secondary">
                {featuredNews.summary}
              </Typography>
            </Box>
            <Box>
              <Button sx={{ marginTop: 2 }}>Read More</Button>
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedArticle;