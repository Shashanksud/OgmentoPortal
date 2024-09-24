import { useState } from 'react';
import './administration.css';
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
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="Custom tabs example">
            <Tab label="Users" value="1" />
            <Tab label="Sales Centers" value="2" />
            <Tab label="Kiosk" value="3" />
          </TabList>
          <Button variant="contained" startIcon={<AddIcon />}>
            {btnValue}
          </Button>
        </Box>
        <TabPanel value="1">
          <UsersTab />
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
