import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import { Add as AddIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import UsersTab from '@/component/UsersTab';
import SalesCenters from '@/component/SalesCentersTab';
import KioskTab from '@/component/KioskTab';

function Administration() {
  const [value, setValue] = useState<string>('1');
  const [btnValue, setBtnValue] = useState<string>('Add User');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case '1':
        setBtnValue('Add User');

        break;
      case '2':
        setBtnValue('Add Sales Center');

        break;
      case '3':
        setBtnValue('Add Kiosk');

        break;
      default:
        setBtnValue('Add Item');
        break;
    }
  };

  return (
    <Box sx={{ marginLeft: '1.3rem' }}>
      <TabContext value={value}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="Custom tabs example"
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                borderRadius: '5rem',
                padding: 1,
                fontSize: '0.9rem',
                marginRight: '5px',
              },
              '& .Mui-selected': {
                fontWeight: '600',
              },
              '& .MuiTab-root:not(.Mui-selected)': {},
            }}
          >
            <Tab label="Users" value="1" />
            <Tab label="Sales Centers" value="2" />
            <Tab label="Kiosk" value="3" />
          </TabList>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: '2rem',
              marginRight: { sm: '1rem', md: '1.5rem' },
              padding: 1,
            }}
          >
            {btnValue}
          </Button>
        </Box>
        <TabPanel value="1">
          <UsersTab />{' '}
        </TabPanel>

        <TabPanel value="2">
          <SalesCenters />
        </TabPanel>

        <TabPanel value="3">
          <KioskTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Administration;
