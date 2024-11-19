import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import PlanogramTab from './Planogram/PlanogramTab';
import HistoryTab from './HistoryTab/HistoryTab';
import CatelogueTab from './CatelogueTab/CatelogueTab';

function KioskManagement() {
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
      <Box>
        <TabList onChange={handleChange} aria-label="custom tab">
          <Tab label="Planogram" value="1" />
          <Tab label="Catelogue" value="2" />
          <Tab label="History" value="3" />
          <TabList />
        </TabList>
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
