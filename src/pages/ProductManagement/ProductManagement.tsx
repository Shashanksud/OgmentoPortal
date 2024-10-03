import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ProductsTab from './ProductsTab/ProductsTab';
import CategoryTab from './CategoryTab/CategoryTab';

function ProductManagement() {
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
          <Tab label="Categories" value="1" />
          <Tab label="Products" value="2" />
        </TabList>
      </Box>

      <TabPanel value="1">
        <CategoryTab />
      </TabPanel>

      <TabPanel value="2">
        {' '}
        <ProductsTab />{' '}
      </TabPanel>
    </TabContext>
  );
}
export default ProductManagement;
