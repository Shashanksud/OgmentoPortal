import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  useTheme,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { globalStyles } from '@/GlobalStyles/globalStyles';
import { AdverisementDetails } from '@/Interfaces/Modals/modals';
import { getAdvertisementEndPoint } from '@/utils/Urls';
import { IOSSwitch } from '@/utils/Switch/useSwitchUtils';
import { getData } from '@/services/axiosWrapper/fetch';

function AdvertisementTab() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [AdDetails, setAdDetail] = useState<AdverisementDetails[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  // const [showAddAdvertisementModal, setShowAddAdvertisementModal] =
  //   useState<boolean>(false);
  console.log(error);

  const fetchData = async () => {
    await getData<AdverisementDetails[]>(getAdvertisementEndPoint)
      .then((response: AdverisementDetails[]) => {
        setAdDetail(response);
      })
      .catch((err) => {
        setError(`Error fetching user data.${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper sx={styles.tablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Enable/Disable</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AdDetails.map((add) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={add.fileName}
                  >
                    <TableCell>{add.fileName}</TableCell>
                    <TableCell>{add.fileName}</TableCell>
                    <TableCell>{add.salesCenters}</TableCell>

                    <TableCell>{add.kioskNames}</TableCell>

                    <TableCell>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon sx={styles.editIcon} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon sx={styles.deleteIcon} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default AdvertisementTab;
