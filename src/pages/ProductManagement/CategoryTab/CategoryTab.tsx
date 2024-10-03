import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DefaultPanaImg from '../../../assets/Pana_Illustration/Add tasks-pana 1.png';

interface Section {
  id: number;
  names: string[];
}
function CategoryTab() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(true);

  // Function to handle adding new sections
  const generateUniqueId = () => {
    const randomNum = Math.random();
    return randomNum;
  };
  const addSection = () => {
    setIsClicked(false);
    setSections([...sections, { id: generateUniqueId(), names: [] }]);
  };

  const addName = (index: number) => {
    const newSections = [...sections];
    newSections[index].names.push(
      `Name ${newSections[index].names.length + 1}`
    );
    setSections(newSections);
  };
  return (
    <Box>
      {isClicked ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box component="img" src={DefaultPanaImg} />
          <Button
            variant="outlined"
            onClick={addSection}
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
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '100vh',
            px: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            {sections.map((section) => (
              <Box
                key={section.id}
                sx={{
                  width: '300px',
                  height: '600px',
                  border: '1px solid grey',
                  borderRadius: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 3,
                }}
              >
                <Box>
                  {section.names.map((name) => (
                    <Typography key={name} variant="body2">
                      {name}
                    </Typography>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  onClick={() => addName(section.id)}
                  sx={{ mt: 'auto' }}
                >
                  Add Name
                </Button>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            onClick={addSection}
            sx={{
              position: sections.length === 0 ? 'static' : 'relative',
              ml: sections.length > 0 ? 2 : 0,
              alignSelf: 'center',
              border: '3px dashed',
              borderRadius: '1rem',
            }}
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
      )}
    </Box>
  );
}
export default CategoryTab;
