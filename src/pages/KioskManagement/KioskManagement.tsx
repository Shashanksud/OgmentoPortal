import { TabContext, TabList, TabPanel } from '@mui/lab';
import { IconButton, Tab, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { globalStyles } from '@/GlobalStyles/globalStyles';
import PlanogramTab from './Planogram/PlanogramTab';
import HistoryTab from './HistoryTab/HistoryTab';
import CatelogueTab from './CatelogueTab/CatelogueTab';

function KioskManagement() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [tabValue, setTabValue] = useState<string>('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
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
    <TabContext value={tabValue}>
      <Box sx={styles.tabContainer}>
        <TabList onChange={handleChange} aria-label="custom tab">
          <Tab label="Planogram" value="1" />
          <Tab label="Catelogue" value="2" />
          <Tab label="History" value="3" />
          <TabList />
        </TabList>
        <IconButton sx={{ margin: '0', padding: 0 }}>
          <SettingsOutlinedIcon
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.text.primary,
              fontSize: '2.3rem',
              borderRadius: '50%',
              padding: '5.9px',
              margin: 0,
            }}
          />
        </IconButton>
      </Box>
      <TabPanel value="1">
        <PlanogramTab />
      </TabPanel>
      <TabPanel value="2">
        <CatelogueTab />
      </TabPanel>
      <TabPanel value="3">
        <HistoryTab />
      </TabPanel>
    </TabContext>
  );
}
export default KioskManagement;
