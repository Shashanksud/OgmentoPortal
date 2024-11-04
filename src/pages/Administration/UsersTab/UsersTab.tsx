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
import { UserDetailsModal, UserRoles } from '@/Interfaces/Modals/modals';
import { getData } from '@/services/axiosWrapper/fetch';
import { getUserDetails } from '@/utils/Urls';
import { globalStyles } from '../../../GlobalStyles/sharedStyles';
import UserForm from './UsersForm/UserForm';

interface UserFormOpenProps {
  onClose: () => void;
}
function UsersTab(props: UserFormOpenProps) {
  const { onClose } = props;
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [userDetails, setUserDetail] = useState<UserDetailsModal[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetailsModal | null>(
    null
  );
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const getSalesCenterNames = (salesCenterNames: { [key: string]: string }) => {
    const allSalesCenterNames = Object.values(salesCenterNames).join(', ');
    return <div>{allSalesCenterNames}</div>;
  };

  const handleEditClick = (user: UserDetailsModal) => {
    setSelectedUser(user);
    setIsEdit(true);
  };
  const fetchData = async () => {
    try {
      const response: UserDetailsModal[] = await getData(getUserDetails);
      setUserDetail(response);
    } catch (err) {
      setError('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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
        <Typography variant="h3">User List</Typography>
        <TextField
          variant="outlined"
          sx={styles.searchTextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={styles.inputAdornment}>
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="Search by user name, role, sales center"
        />
      </Box>
      <Paper sx={styles.tablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails.map((user: UserDetailsModal) => (
                <TableRow key={user.userUid}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.emailId}</TableCell>
                  <TableCell>{UserRoles[user.roleId]}</TableCell>
                  <TableCell>
                    {user.salesCenters == null ||
                    Object.keys(user.salesCenters).length === 0
                      ? '-'
                      : getSalesCenterNames(user.salesCenters)}{' '}
                  </TableCell>
                  <TableCell>{user.kioskName}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEditClick(user);
                      }}
                    >
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
    </>
  ) : (
    <UserForm
      user={selectedUser}
      setRefetchTrigger={setRefetchTrigger}
      onClose={onClose}
      setIsEdit={setIsEdit}
    />
  );
}

export default UsersTab;
