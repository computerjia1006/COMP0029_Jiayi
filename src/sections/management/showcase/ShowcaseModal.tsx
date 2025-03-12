
// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// types
import { CustomerList } from 'types/customer';

// project-imports
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';

import FileUpload from '@mui/icons-material/FileUpload';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

// ==============================|| SHOWCASE - ADD / EDIT ||============================== //

export interface Props {
  customer?: CustomerList | null;
  open: boolean;
  modalToggler: (val: boolean) => void;
}

const ShowcaseModal = ({ customer, open, modalToggler }: Props) => {
  const theme = useTheme();

  const isCreating = !customer;

  const ShowcaseSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(500),
    location: Yup.string().max(255),
    date: Yup.date()
  });

  const formik = useFormik({
    initialValues: {
      id: customer?.id || 0,
      name: customer?.name || '',
      email: customer?.email || '',
      location: customer?.location || '',
      description: '',
      date: new Date(),
      status: customer?.status || 1
    },
    validationSchema: ShowcaseSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // Submit form data to API
        console.log('FORM SUBMIT', values);
        setSubmitting(false);
        modalToggler(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Dialog
      open={open}
      onClose={() => modalToggler(false)}
      TransitionComponent={PopupTransition}
      keepMounted
      maxWidth="sm"
      fullWidth
      sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
      aria-describedby="alert-dialog-slide-description"
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">{customer ? 'Edit Showcase Project' : 'New Showcase Project'}</Typography>
              <Tooltip title="Close">
                <IconButton color="secondary" onClick={() => modalToggler(false)} size="small" sx={{ p: 0 }}>
                  <CloseOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Title</InputLabel>
                  <TextField
                    fullWidth
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Description</InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Cover Image</InputLabel>
                  <Button variant="outlined" startIcon={<FileUpload />} component="label">
                    Upload File
                    <input type="file" hidden />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Status</InputLabel>
                  <FormControl>
                    <RadioGroup row {...getFieldProps('status')}>
                      <FormControlLabel value={1} control={<Radio />} label="Active" />
                      <FormControlLabel value={2} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Delete Showcase">
                    <IconButton onClick={() => modalToggler(false)} size="large" color="error">
                      <CloseOutlined />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button color="error" onClick={() => modalToggler(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {customer ? 'Edit' : 'Add'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default ShowcaseModal;