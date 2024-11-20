import { CustomInput, CustomSelect } from '@/GlobalStyles/globalStyles';
import { Clear, Search, Add as AddIcon } from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  // InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { Box } from '@mui/system';
import { useState } from 'react';

function PlanogramTab() {
  const machineData = [
    { machineId: '23423fsf2', machineName: 'Machine 1' },
    { machineId: '2fsf2', machineName: 'Machine 2' },
    { machineId: '23sdf3fsf2', machineName: 'Machine 2' },
  ];
  const [searchText, setSearchText] = useState<string>('');
  const theme = useTheme();
  const customSelect = CustomSelect(theme);
  const customInput = CustomInput(theme);
  const [machine, setMachine] = useState(machineData[0]?.machineId || '');

  return (
    <Box
      sx={{
        width: '63.12rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '9rem',
          borderRadius: '0.5rem',
          backgroundColor: theme.palette.primary.main,
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '45%',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '1rem',
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{
                marginLeft: '12px',
                fontSize: '15px',
                fontWeight: '500',
                marginBottom: '6px',
              }}
            >
              Select Machine
            </Typography>

            <Select
              name="machine"
              value={machine}
              onChange={(event) => setMachine(event.target.value)}
              sx={{ ...customSelect.dark.select, width: '13rem' }}
            >
              {machineData.map((singleMachine) => (
                <MenuItem
                  key={singleMachine.machineId}
                  value={singleMachine.machineId}
                >
                  {singleMachine.machineName}{' '}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{
                marginLeft: '12px',
                fontSize: '15px',
                fontWeight: '500',
                marginBottom: '6px',
              }}
            >
              Search Product
            </Typography>
            <TextField
              variant="outlined"
              sx={{ ...customInput.dark, padding: 0, marginBottom: '1.2rem' }}
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchText ? (
                        <Clear
                          onClick={() => {
                            setSearchText('');
                          }}
                          sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                          }}
                        />
                      ) : (
                        <Search
                          sx={{
                            color: theme.palette.text.primary,
                            cursor: 'pointer',
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Search by category"
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '22%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '1rem',
          }}
        >
          <IconButton>
            <PrintOutlinedIcon
              sx={{
                color: theme.palette.text.primary,
                fontWeight: '200',
                fontSize: '2.7rem',
                border: `1px solid ${theme.palette.text.primary}`,
                borderRadius: '50%',
                padding: '6px',
              }}
            />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />}>
            New Machine
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: '63.12rem',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <Box sx={{ width: '38.9rem' }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '3.6rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme.palette.primary.main,
              paddingLeft: '1rem',
              paddingRight: '1rem',
              borderRadius: '0.5rem',
            }}
          >
            <Typography variant="body1">TRAY 1</Typography>
            <Button variant="text" startIcon={<AddIcon />}>
              ADD TRAY
            </Button>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '99.5%',
                  height: '10.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: '1rem',
                  paddingRight: '1.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                <Box
                  sx={{
                    border: '1px solid red',
                    width: '7rem',
                    height: '8rem',
                    borderRadius: '1rem',
                  }}
                >
                  {' '}
                  belt one
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      color: '#ffff',
                      backgroundColor: '#ffff',
                      width: '6rem',
                    }}
                    value={1}
                  />
                </Box>
                <Box
                  sx={{
                    border: '1px solid red',
                    width: '7rem',
                    height: '8rem',
                  }}
                >
                  {' '}
                  belt one
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      color: '#ffff',
                      backgroundColor: '#ffff',
                      width: '6rem',
                    }}
                    value={1}
                  />
                </Box>
                <Box
                  sx={{
                    border: '1px solid red',
                    width: '7rem',
                    height: '8rem',
                  }}
                >
                  {' '}
                  belt two
                  <LinearProgress
                    variant="determinate"
                    sx={{
                      color: '#ffff',
                      backgroundColor: '#ffff',
                      width: '6rem',
                    }}
                    value={1}
                  />
                </Box>
              </Box>
              <IconButton
                sx={{
                  padding: '0px',
                  position: 'absolute',
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.primary.main,
                }}
              >
                <AddIcon
                  sx={{
                    '&. hover': {
                      color: '#ffff',
                      backgroundColor: '#2c2c2c',
                    },
                  }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '99.5%',
                  height: '10.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                Tray 2
              </Box>
              <IconButton
                sx={{
                  padding: '0px',
                  position: 'absolute',
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.primary.main,
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '99.5%',
                  height: '10.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                Tray3
              </Box>
              <IconButton
                sx={{
                  padding: '0px',
                  position: 'absolute',
                  right: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.primary.main,
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '23.5rem',
            height: '36rem',
            borderRadius: '0.5rem',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          single product view
        </Box>
      </Box>
    </Box>
  );
}
export default PlanogramTab;
