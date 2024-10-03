import { Box } from '@mui/system';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DefaultPanaImg from '../../../assets/Pana_Illustration/Add tasks-pana 1.png';

function CategoryTab() {
  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Box component="img" src={DefaultPanaImg} />
        <Button
          variant="outlined"
          sx={{ border: '3px dashed' }}
          startIcon={
            <AddIcon
              sx={{
                borderRadius: '1rem',
                backgroundColor: '#ffffff',
                color: '#2c2c2c',
              }}
            />
          }
        >
          ADD CATEGORY
        </Button>
      </Box>
    </Box>
  );
}
export default CategoryTab;
