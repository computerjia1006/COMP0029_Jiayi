import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
  colorInvert?: boolean;
}

const Topbar = ({
  onSidebarOpen,
  pages,
  colorInvert = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const {
    landings: homePages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >

      <Box
        display={'flex'}
        component="a"
        href="/"
        title="theFront"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light' && !colorInvert
              ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
              : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
          }
          height={1}
          width={1}
        />
      </Box>




      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          <Button
            component="a"
            href="/"
            sx={{
              color: window.location.pathname === '/' ? theme.palette.primary.main : '#000000',
              fontWeight: window.location.pathname === '/' ? 600 : 400,
            }}
          >
            Home
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            component="a"
            href="/howitworks"
            sx={{
              color: window.location.pathname === '/howitworks' ? theme.palette.primary.main : '#000000',
              fontWeight: window.location.pathname === '/howitworks' ? 600 : 400,
            }}
          >
            How it Works
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            component="a"
            href="/projects"
            sx={{
              color: window.location.pathname === '/projects' ? theme.palette.primary.main : '#000000',
              fontWeight: window.location.pathname === '/projects' ? 600 : 400,
            }}
          >
            Project Examples
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            component="a"
            href="/news"
            sx={{
              color: window.location.pathname === '/news' ? theme.palette.primary.main : '#000000',
              fontWeight: window.location.pathname === '/news' ? 600 : 400,
            }}
          >
            News
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            component="a"
            href="/events"
            sx={{
              color: window.location.pathname === '/events' ? theme.palette.primary.main : '#000000',
              fontWeight: window.location.pathname === '/events' ? 600 : 400,
            }}
          >
            Events
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            target="blank"
            href="/login"
            size="large"
          >
            Log In / Register
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;