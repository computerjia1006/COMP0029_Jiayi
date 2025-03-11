import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { FormikErrors, FormikTouched, getIn } from 'formik';

// project import
import InvoiceField from './InvoiceField';
import AlertProductDelete from './AlertProductDelete';

import { useGetInvoiceMaster } from 'api/invoice';
import { openSnackbar } from 'api/snackbar';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

// types
import { SnackbarProps } from 'types/snackbar';
import { Items } from 'types/invoice';

interface FormValue {
  id: number;
  invoice_id: number;
  status: string;
  date: Date;
  due_date: Date;
  cashierInfo: { name: string; address: string; phone: string; email: string };
  customerInfo: { address: string; email: string; name: string; phone: string };
  invoice_detail: Items[];
  discount: number;
  tax: number;
  notes: string;
}

interface InvoiceItemProps {
  id: string;
  name: string;
  description: string;
  qty: number;
  price: number;
  onDeleteItem: (index: number) => void;
  onEditItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
  Blur: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors: FormikErrors<FormValue>;
  touched: FormikTouched<FormValue>;
}

export default function InvoiceItem({
  id,
  name,
  description,
  qty,
  price,
  onDeleteItem,
  onEditItem,
  index,
  Blur,
  errors,
  touched
}: InvoiceItemProps) {
  const { invoiceMaster } = useGetInvoiceMaster();

  const [open, setOpen] = useState(false);
  const handleModalClose = (status: boolean) => {
    setOpen(false);
    if (status) {
      onDeleteItem(index);
      openSnackbar({
        open: true,
        message: 'Product Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    }
  };

  const Name = `invoice_detail[${index}].name`;
  const touchedName = getIn(touched, Name);
  const errorName = getIn(errors, Name);

  const textFieldItem = [
    {
      placeholder: 'Item name',
      label: 'Item Name',
      name: `invoice_detail.${index}.name`,
      type: 'text',
      id: id + '_name',
      value: name,
      errors: errorName,
      touched: touchedName
    },
    {
      placeholder: 'Description',
      label: 'Description',
      name: `invoice_detail.${index}.description`,
      type: 'text',
      id: id + '_description',
      value: description
    },
    { placeholder: '', label: 'Qty', type: 'number', name: `invoice_detail.${index}.qty`, id: id + '_qty', value: qty },
    { placeholder: '', label: 'price', type: 'number', name: `invoice_detail.${index}.price`, id: id + '_price', value: price }
  ];

  return (
    <>
      {textFieldItem.map((item) => {
        return (
          <InvoiceField
            onEditItem={onEditItem}
            onBlur={Blur}
            cellData={{
              placeholder: item.placeholder,
              name: item.name,
              type: item.type,
              id: item.id,
              value: item.value,
              errors: item.errors,
              touched: item.touched
            }}
            key={item.label}
          />
        );
      })}
      <TableCell>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pl: 2 }}>
            {invoiceMaster === undefined ? (
              <Skeleton width={520} height={16} />
            ) : (
              <Typography>
                {invoiceMaster.country?.prefix ?? ''}
                {(price * qty).toFixed(2)}
              </Typography>
            )}
          </Box>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Remove Item">
          <Button color="error" onClick={() => setOpen(true)}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </TableCell>
      <AlertProductDelete title={name} open={open} handleClose={handleModalClose} />
    </>
  );
}
