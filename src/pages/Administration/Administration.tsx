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
import { globalStyles } from '@/GlobalStyles/globalStyles';
import { useTheme } from '@mui/material';
import KioskTab from './Kiosk/KioskTab';
import UserForm from './UsersTab/UsersForm/UserForm';
import SalesCenterForm from './SalesCenter/SalesCenterForm/SalesCenterForm';
import KioskForm from './Kiosk/KioskForm/KioskForm';

function Administration() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [activeTab, setActiveTabValue] = useState<string>('1');
  const [btnValue, setBtnValue] = useState<string>('Add User');
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [showAddSalesCenterForm, setShowAddSalesCenterForm] =
    useState<boolean>(false);
  const [showAddKioskForm, setShowAddKioskForm] = useState<boolean>(false);

  const onTabChange = (event: React.SyntheticEvent, newValue: string) => {
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

  const onAddButtonClick = () => {
    switch (activeTab) {
      case '1':
        setBtnValue('Add User');
        setShowAddUserForm(true);
        break;
      case '2':
        setBtnValue('Add Sales Center');
        setShowAddSalesCenterForm(true);
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

  const OnFormClose = () => {
    setShowAddSalesCenterForm(false);
    setShowAddKioskForm(false);
  };

  const onUserFormClose = () => {
    setShowAddUserForm(false);
  };

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box sx={styles.tabContainer}>
          <TabList onChange={onTabChange} aria-label="Custom tabs example">
            <Tab label="Users" value="1" />
            <Tab label="Sales Centers" value="2" />
            <Tab label="Kiosk" value="3" />
          </TabList>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddButtonClick}
          >
            {btnValue}
          </Button>
        </Box>

        <TabPanel value="1">
          {showAddUserForm ? (
            <UserForm onClose={onUserFormClose} user={null} />
          ) : (
            <UsersTab onClose={onUserFormClose} />
          )}
        </TabPanel>

        <TabPanel value="2">
          {showAddSalesCenterForm ? (
            <SalesCenterForm onClose={OnFormClose} sale={null} />
          ) : (
            <SalesCenters onClose={OnFormClose} />
          )}
        </TabPanel>

        <TabPanel value="3">
          {showAddKioskForm ? (
            <KioskForm onClose={OnFormClose} kiosk={null} />
          ) : (
            <KioskTab onClose={OnFormClose} />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Administration;
