import { useEffect, useState } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search,
} from '@mui/icons-material';
import {
  useTheme,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Kiosk } from '@/Interfaces/Modals/modals';
import { getData } from '@/services/axiosWrapper/fetch';
import { getKioskEndpoint } from '@/utils/Urls';
import { KioskFormOpenProps as KioskTabProps } from '@/Interfaces/Props/props';
import { globalStyles } from '../../../GlobalStyles/sharedStyles';
import KioskForm from './KioskForm/KioskForm';

function KioskTab(props: KioskTabProps) {
  const { onClose } = props;
  const [kioskData, setKiosk] = useState<Kiosk[]>([]);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [selectedKiosk, setSelectedKiosk] = useState<Kiosk | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const theme = useTheme();
  const styles = globalStyles(theme);

  const handleEditClick = (kiosk: Kiosk) => {
    console.log('Edit clicked for:');
    setSelectedKiosk(kiosk);
    setIsEdit(true);
  };
  const fetchData = async () => {
    await getData<Kiosk[]>(getKioskEndpoint)
      .then((response: Kiosk[]) => {
        setKiosk(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);
  const onRefetchTrigger = () => setRefetchTrigger(true);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Box sx={styles.listHeaderBox}>
          <Typography variant="h3">Kiosk List</Typography>
        </Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return !isEdit ? (
    <>
      <Box sx={styles.listHeaderBox}>
        <Typography variant="h3">Kiosk List</Typography>
        <TextField
          variant="outlined"
          sx={styles.searchTextField}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={styles.inputAdornment}>
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Search by user name, role, sales center"
        />
      </Box>
      <Paper sx={styles.tablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kioskData.map((kiosk: Kiosk) => (
                <TableRow hover key={kiosk.kioskName}>
                  <TableCell>{kiosk.kioskName}</TableCell>
                  <TableCell>{kiosk.salesCenter.item2}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon
                        sx={styles.editIcon}
                        onClick={() => {
                          handleEditClick(kiosk);
                        }}
                      />
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
    </>
  ) : (
    <KioskForm
      kiosk={selectedKiosk}
      onRefetchTrigger={onRefetchTrigger}
      onClose={onClose}
      setIsEdit={setIsEdit}
    />
  );
}

export default KioskTab;
