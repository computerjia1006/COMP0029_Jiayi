
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import db from 'db';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}


const FaqPage = (): JSX.Element => {
  const theme = useTheme();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("/api/faq"); // Call API
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <Box>
      <Box marginBottom={1}>
        <Typography
          variant="h4"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          Have a question?
        </Typography>
        <Typography variant="h6" align={'center'} color={'text.secondary'}  >
          Search our FAQ for answers to anything you might ask.
        </Typography>
      </Box>
    <Box>
      {faqs.map((faq) => (
        <Box
          component={Accordion}
          key={faq.id}
          padding={1}
          marginBottom={2}
          borderRadius={`${theme.spacing(1)} !important`}
          sx={{ '&::before': { display: 'none' } }}
        >
          <Box
            component={AccordionSummary}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-content-${faq.id}`}
            id={`panel-header-${faq.id}`}
          >
            <Typography fontWeight={600}>{faq.question}</Typography>
          </Box>
          <AccordionDetails>
            <Typography color="text.secondary">{faq.answer}</Typography>
          </AccordionDetails>
        </Box>
      ))}
    </Box>
  </Box>
  );
};

export default FaqPage;
