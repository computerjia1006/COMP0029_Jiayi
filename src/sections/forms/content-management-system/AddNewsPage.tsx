
'use client';

// Material-UI imports
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  FormControl,
  Typography,
  TextareaAutosize,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

// Validation Schema
const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  summary: yup.string().required('News summary is required'),
  content: yup.string().required('News content is required')
});

export default function AddNewsPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      date: null,
      title: '',
      summary: '',
      content: '',
      status: 'unpublished'
    },
    validationSchema,
    onSubmit: () => {
      alert('News added successfully!');
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Box sx={{ width: '80%', padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add News
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputLabel>Created Date</InputLabel>
                <DatePicker
                  value={formik.values.date ? dayjs(formik.values.date) : null}
                  onChange={(newValue) => formik.setFieldValue('date', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" {...formik.getFieldProps('title')} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>News Summary</InputLabel>
              <TextareaAutosize
                minRows={3}
                placeholder="Enter news summary"
                style={{ width: '100%', padding: '8px' }}
                {...formik.getFieldProps('summary')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>News Content</InputLabel>
              <TextareaAutosize
                minRows={5}
                placeholder="Enter news content"
                style={{ width: '100%', padding: '8px' }}
                {...formik.getFieldProps('content')}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                  Upload Image
                  <input hidden accept="image/*" type="file" />
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Set the News Status</InputLabel>
              <RadioGroup
                row
                value={formik.values.status}
                onChange={(e) => formik.setFieldValue('status', e.target.value)}
              >
                <FormControlLabel value="unpublished" control={<Radio />} label="Unpublished" />
                <FormControlLabel value="published" control={<Radio />} label="Published" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="contained" color="error" onClick={() => formik.resetForm()}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Add News
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
