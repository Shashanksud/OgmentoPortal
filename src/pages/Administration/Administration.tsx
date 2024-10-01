import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import { Add as AddIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import UsersTab from '@/pages/Administration/UsersTab/UsersTab';
import SalesCenters from '@/pages/Administration/SalesCenter/SalesCentersTab';
import KioskTab from '@/pages/Administration/Kiosk/KioskTab';
import AddUser from './UsersTab/Forms/AddUser';

function Administration() {
  const [value, setValue] = useState<string>('1');
  const [btnValue, setBtnValue] = useState<string>('Add User');
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false); // To track the visibility of the AddUser form

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setShowAddUserForm(false); // Reset AddUser form visibility when switching tabs
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

  const handleAddButtonClick = () => {
    setShowAddUserForm(true); // Show AddUser form when the Add button is clicked
  };

  const handleFormClose = () => {
    setShowAddUserForm(false); // Hide AddUser form and show UsersTab when the form is closed
  };

  return (
    <Box>
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
            <Tab label="Users" value="1" />
            <Tab label="Sales Centers" value="2" />
            <Tab label="Kiosk" value="3" />
          </TabList>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddButtonClick}
          >
            {btnValue}
          </Button>
        </Box>

        <TabPanel value="1">
          {showAddUserForm ? (
            <AddUser onClose={handleFormClose} />
          ) : (
            <UsersTab />
          )}
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
