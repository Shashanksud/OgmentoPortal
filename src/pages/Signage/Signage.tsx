import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import { Add as AddIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import BannerTab from './BannerTab/BannerTab';
import Advertisement from './AdvertisementTab/AdvertisementTab';

function Signage() {
  const [value, setValue] = useState<string>('1');
  const [btnValue, setBtnValue] = useState<string>('Add Video');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    switch (newValue) {
      case '1':
        setBtnValue('Add Video');
        break;
      case '2':
        setBtnValue('Add Banner');
        break;
      default:
        setBtnValue('Add Video');
    }
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
            <Tab label="Advertisement" value="1" />
            <Tab label="Banner" value="2" />
          </TabList>
          <Button variant="contained" startIcon={<AddIcon />}>
            {btnValue}
          </Button>
        </Box>

        <TabPanel value="1">
          <Advertisement />
        </TabPanel>

        <TabPanel value="2">
          <BannerTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Signage;
