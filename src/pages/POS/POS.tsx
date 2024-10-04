import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import OrdersTab from './OrdersTab/OrdersTab';
import DiscountsTab from './DiscountsTab/DiscountsTab';

function POS() {
  const [value, setValue] = useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case '1':
        break;
      case '2':
        break;
      case '3':
        break;
      default:
        break;
    }
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '97.8%',
          alignItems: 'center',
        }}
      >
        <TabList onChange={handleChange} aria-label="Custom tabs example">
          <Tab label="Orders" value="1" />
          <Tab label="Discounts" value="2" />
        </TabList>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button>Choose Kiosk</Button>
          <ArrowDownwardIcon
            sx={{
              width: '2.2rem',
              height: '2.2rem',
              borderRadius: '5rem',
              backgroundColor: '#ffffff',
              color: '#2c2c2c',
              marginLeft: '1rem',
            }}
          />
        </Box>
      </Box>

      <TabPanel value="1">
        <OrdersTab />
      </TabPanel>

      <TabPanel value="2">
        {' '}
        <DiscountsTab />{' '}
      </TabPanel>
    </TabContext>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default POS;
