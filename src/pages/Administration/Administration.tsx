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
import AddUser from './UsersTab/UsersForm/AddUser';
import AddSalesCenter from './SalesCenter/SalesCenterForm/AddSalesCenter';
import AddKiosk from './Kiosk/KioskForm/AddKiosk';

function Administration() {
  const [activeTab, setActiveTabValue] = useState<string>('1');
  const [btnValue, setBtnValue] = useState<string>('Add User');
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [showAddSalesCenterForm, setShowAddUSalesCenterForm] =
    useState<boolean>(false);
  const [showAddKioskForm, setShowAddKioskForm] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTabValue(newValue);
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
    switch (activeTab) {
      case '1':
        setBtnValue('Add User');
        setShowAddUserForm(true);
        break;
      case '2':
        setBtnValue('Add Sales Center');
        setShowAddUSalesCenterForm(true);
        break;
      case '3':
        setBtnValue('Add Kiosk');
        setShowAddKioskForm(true);
        break;
      default:
        setBtnValue('Add Item');
        break;
    }
  };

  const handleFormClose = () => {
    setShowAddUSalesCenterForm(false);
    setShowAddKioskForm(false);
  };
  const onUserFormClose = () => {
    setShowAddUserForm(false);
  };
  return (
    <Box>
      <TabContext value={activeTab}>
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
            <AddUser onClose={onUserFormClose} />
          ) : (
            <UsersTab />
          )}
        </TabPanel>

        <TabPanel value="2">
          {showAddSalesCenterForm ? (
            <AddSalesCenter onClose={handleFormClose} />
          ) : (
            <SalesCenters />
          )}
        </TabPanel>

        <TabPanel value="3">
          {showAddKioskForm ? (
            <AddKiosk onClose={handleFormClose} />
          ) : (
            <KioskTab />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Administration;
