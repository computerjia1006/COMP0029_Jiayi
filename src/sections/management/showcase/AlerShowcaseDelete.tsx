
import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// ==============================|| SHOWCASE - DELETE ||============================== //

export interface Props {
  id: number;
  title?: string;
  open: boolean;
  handleClose: (status: boolean) => void;
}

export default function AlertShowcaseDelete({ id, title, open, handleClose }: Props) {
  const [showAlert, setShowAlert] = useState(open);

  const handleAlertClose = () => {
    setShowAlert(!showAlert);
    handleClose(false);
  };

  return (
    <Dialog
      open={showAlert}
      TransitionComponent={PopupTransition}
      keepMounted
      onClose={handleAlertClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Typography variant="h5">Are you sure you want to delete?</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="body2" component="span">
            By deleting showcase{' '}
            <Typography variant="subtitle1" component="span">
              {title}
            </Typography>{' '}
            this action cannot be undone.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleAlertClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAlertClose}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}