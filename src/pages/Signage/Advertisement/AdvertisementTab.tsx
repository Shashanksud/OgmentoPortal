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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { globalStyles } from '@/GlobalStyles/globalStyles';
import { AdvertisementModel } from '@/Interfaces/Modals/modals';
import { getAdvertisementEndPoint } from '@/utils/Urls';
import { getData } from '@/services/axiosWrapper/fetch';

function AdvertisementTab() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [AdDetails, setAdDetail] = useState<AdvertisementModel[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  console.log(AdDetails);
  console.log(error);

  const fetchData = async () => {
    await getData<AdvertisementModel[]>(getAdvertisementEndPoint)
      .then((response: AdvertisementModel[]) => {
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
              {AdDetails.map((user) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.fileName}
                >
                  <TableCell>{user.signageUid}</TableCell>
                  <TableCell>{user.salesCenters}</TableCell>
                  <TableCell>{user.kioskNames}</TableCell>
                  <TableCell>{user.isActive}</TableCell>
                  <TableCell>{user.isAlwaysOn}</TableCell>

                  <TableCell>
                    <IconButton>
                      <EditIcon sx={styles.editIcon} />
                    </IconButton>

                    <IconButton>
                      <DeleteIcon sx={styles.deleteIcon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
export default AdvertisementTab;
