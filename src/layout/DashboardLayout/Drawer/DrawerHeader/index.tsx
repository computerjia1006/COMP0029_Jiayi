// material-ui
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

// ==============================|| STYLED - DRAWER HEADER ||============================== //

interface DrawerHeaderStyledProps {
  open: boolean;
}

const DrawerHeaderStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open'
})<DrawerHeaderStyledProps>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...(open && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  }),
  ...(!open && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  })
}));

// ==============================|| DRAWER HEADER COMPONENT ||============================== //

interface DrawerHeaderProps {
  open: boolean;
}

export default function DrawerHeader({ open }: DrawerHeaderProps) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled open={open}>
      {/* Your header content here */}
    </DrawerHeaderStyled>
  );
}
