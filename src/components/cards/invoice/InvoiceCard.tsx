// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
interface Props {
  title: string;
  count: string;
  percentage?: number;
  isLoss?: boolean;
  color?: any;
  children: any;
  invoice: string;
}

// ==============================|| INVOICE - CARD ||============================== //

export default function TableWidgetCard({ color, title, count, percentage, isLoss, children, invoice }: Props) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item md={5}>
        <Stack direction="column" spacing={2}>
          <Typography variant="subtitle1">{title}</Typography>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1">{invoice}</Typography>
              <Typography color="secondary">invoices</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item md={7}>
        <Stack direction="column" alignItems="flex-end" justifyContent="space-evenly">
          {percentage && (
            <Stack sx={{ ml: 1.25, pl: 1 }} direction="row" alignItems="center" spacing={1}>
              {!isLoss && <CaretUpOutlined style={{ fontSize: '0.75rem', color: `${color}` }} />}
              {isLoss && <CaretDownOutlined style={{ fontSize: '0.75rem', color: `${color}` }} />}
              <Typography color="secondary">{percentage}%</Typography>
            </Stack>
          )}
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
}
