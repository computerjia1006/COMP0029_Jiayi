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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Router
import { useRouter } from 'next/navigation';

const validationSchema = yup.object({
  eventTitle: yup.string().required('Event title is required'),
  eventDate: yup.date().required('Event date is required'),
  eventTime: yup.string().required('Event time is required'),
  eventLocation: yup.string().required('Event location is required'),
  eventSummary: yup.string().required('Event summary is required'),
  eventDescription: yup.string().required('Event description is required'),
  organiserName: yup.string().required('Organiser name is required'),
  organiserEmail: yup.string().email('Enter a valid email').required('Organiser email is required'),
  cost: yup.string().required('Cost is required')
});

export default function AddEventForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      eventTitle: '',
      eventSummary: '',
      eventDescription: '',
      openTo: '',
      organiserName: '',
      availability: '',
      organiserEmail: '',
      cost: '',
      ipAddress: ''
    },
    validationSchema,
    onSubmit: () => {
      openSnackbar({
        open: true,
        message: 'Event added successfully!',
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <MainCard title="Add Event" sx={{ width: '80%' }}> 
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputLabel>Event Date</InputLabel>
                <DatePicker
                  value={formik.values.eventDate ? dayjs(formik.values.eventDate) : null}
                  onChange={(newValue) => formik.setFieldValue('eventDate', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputLabel>Event Time</InputLabel>
                <TimePicker
                  value={formik.values.eventTime ? dayjs(formik.values.eventTime) : null}
                  onChange={(newValue) => formik.setFieldValue('eventTime', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Event Location" {...formik.getFieldProps('eventLocation')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Event Title" {...formik.getFieldProps('eventTitle')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Event Summary" {...formik.getFieldProps('eventSummary')} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Event Description</InputLabel>
              <TextareaAutosize
                minRows={4}
                placeholder="Enter event description"
                style={{ width: '100%', padding: '8px' }}
                {...formik.getFieldProps('eventDescription')}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Open To</InputLabel>
                <Select {...formik.getFieldProps('openTo')}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="invited">Invited Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Organiser Name" {...formik.getFieldProps('organiserName')} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select {...formik.getFieldProps('availability')}>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Organiser Email" {...formik.getFieldProps('organiserEmail')} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Cost</InputLabel>
                <Select {...formik.getFieldProps('cost')}>
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="IP Address" {...formik.getFieldProps('ipAddress')} />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                  Upload
                  <input hidden accept="image/*" type="file" />
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
                    Add Event
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