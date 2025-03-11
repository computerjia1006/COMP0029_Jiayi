'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Main from 'layout/WebsiteLayout';
import Container from 'components/Container';
import { useParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewspaperIcon from '@mui/icons-material/Newspaper';



interface NewsData {
  id:string;
  title: string;
  summary: string;
  createdAt: string;
  imageUrl: string;
  content: string;
  author: string;
}




const NewsDetail = (): JSX.Element => {
  const theme = useTheme();
  const params = useParams();
  const newsId = params.id;

  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const res = await fetch(`/api/news/${newsId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await res.json();
        setNewsData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load the news article');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [newsId]);

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  if (!newsData) {
    return <Typography variant="h6" align="center">No news article found with the provided ID.</Typography>;
  }

  
  return (
    <Main colorInvert={true}>
      <Box bgcolor={'alternate.main'} position={'relative'}>
        <Container>
        
        <Typography variant="h4" gutterBottom>
                {newsData.title}
              </Typography>
          <Card sx={{ maxWidth: '100%', marginY: 4, boxShadow: 'none' }}>
            
            <CardMedia
              component="img"
              height={400}
              image={newsData.imageUrl}
              alt={newsData.title}
              sx={{ objectFit: 'cover' }}
            />
            
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {formatDate(newsData.createdAt)} 
              </Typography>
              <Typography variant="h5" sx={{ whiteSpace: 'pre-line', marginTop: 2 }}>
                {newsData.summary}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', marginTop: 2 }}>
                {newsData.content}
              </Typography>
              <Box sx={{display:'flex',justifyContent:'flex-end', marginTop:2}} >
                <Button component={'a'} href={`/news/`} variant="outlined"  startIcon={<ArrowBackIcon />}>
                      Return back 
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Main>
  );
};

export default NewsDetail;
