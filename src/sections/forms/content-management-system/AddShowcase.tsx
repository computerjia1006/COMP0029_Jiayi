'use client';

// Material-UI imports
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  TextareaAutosize,
  Box
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// Calendar visualization
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Router
import { useRouter } from 'next/navigation';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  videoUrl: yup.string().url('Enter a valid URL'),
  organizationName: yup.string().required('Organization name is required')
});

export default function AddShowcaseForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      year: '',
      title: '',
      status: '',
      videoUrl: '',
      category: '',
      organizationName: '',
      organizationType: '',
      description: ''
    },
    validationSchema,
    onSubmit: () => {
      openSnackbar({
        open: true,
        message: 'Project added successfully!',
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <MainCard title="Add a New Project" sx={{ width: '80%' }}> 
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputLabel>Year of Project</InputLabel>
                <DatePicker
                  views={['year']}
                  value={formik.values.year ? dayjs(formik.values.year.toString()) : null}
                  onChange={(newValue) => formik.setFieldValue('year', newValue?.year() || '')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Title" {...formik.getFieldProps('title')} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select {...formik.getFieldProps('status')}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Video URL" {...formik.getFieldProps('videoUrl')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Category" {...formik.getFieldProps('category')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Organization Name" {...formik.getFieldProps('organizationName')} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Organization Type</InputLabel>
                <Select {...formik.getFieldProps('organizationType')}>
                  <MenuItem value="non-profit">Non-Profit</MenuItem>
                  <MenuItem value="government">Government</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Description</InputLabel>
              <TextareaAutosize
                minRows={4}
                placeholder="Enter project description"
                style={{ width: '100%', padding: '8px' }}
                {...formik.getFieldProps('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                  Upload
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push('/management/content/showcases/batch-upload')}
                >
                  Batch Upload CSV
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="contained" color="error" onClick={() => formik.resetForm()}>
                  Reset
                </Button>
                <AnimateButton>
                  <Button variant="contained" type="submit">
                    Add a New Project
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </Box>
  );
}
