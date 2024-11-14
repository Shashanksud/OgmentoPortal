import { useEffect, useState } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search,
  Clear,
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
  Button,
  Modal,
} from '@mui/material';
import { UserDetailsModal, UserRoles } from '@/Interfaces/Modals/modals';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteData, getData } from '@/services/axiosWrapper/fetch';
import { deleteUserEndpoint, userDetailsEndpoint } from '@/utils/Urls';
import useSnackbarUtils from '@/utils/Snackbar/useSnackbarUtils';
import { CustomInput, globalStyles } from '@/GlobalStyles/globalStyles';
import { UserFormOpenProps as UserTabProps } from '@/Interfaces/Props/props';
import UserForm from './UsersForm/UserForm';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';

function UsersTab(props: UserTabProps) {
  const { onClose } = props;
  const theme = useTheme();
  const customInput = CustomInput(theme);
  const styles = globalStyles(theme);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userDetails, setUserDetail] = useState<UserDetailsModal[]>([]);
  const { showSuccess, showError } = useSnackbarUtils();
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userDetails);

  const [selectedUser, setSelectedUser] = useState<UserDetailsModal | null>(
    null
  );
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const getSalesCenterNames = (salesCenterNames: { [key: string]: string }) => {
    const allSalesCenterNames = Object.values(salesCenterNames).join(', ');
    return <div>{allSalesCenterNames}</div>;
  };

  const onEditClick = (user: UserDetailsModal) => {
    setSelectedUser(user);
    setIsEdit(true);
  };
  const fetchData = async () => {
    await getData<UserDetailsModal[]>(userDetailsEndpoint)
      .then((response: UserDetailsModal[]) => {
        setUserDetail(response);
      })
      .catch((err) => {
        setError(`Error fetching user data.${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteUser = async (userUid: string) => {
    await deleteData(deleteUserEndpoint, userUid)
      .then(() => {
        setOpenDeleteModal(false);
        setRefetchTrigger((prev) => !prev);
        showSuccess('User deleted successfully!');
      })
      .catch((err) => {
        console.log(err);
        showError('Failed to delete user!');
      })
      .finally(() => {
        setOpenDeleteModal(false);
      });
  };
  const getRoleName = (role: number) => {
    return UserRoles[role];
  };
  useEffect(() => {
    const filtered = userDetails.filter((user) => {
      const salesCenterNames = Object.values(user.salesCenters)
        .join(', ')
        .toLowerCase();
      const roleName = getRoleName(user.roleId).toLowerCase();

      return (
        user.userName.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        salesCenterNames.includes(searchText.trim().toLowerCase()) ||
        roleName.includes(searchText.trim().toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [userDetails, searchText]);

  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);
  const onRefetchTrigger = () => setRefetchTrigger((prev) => !prev);
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
        <Typography variant="h3">Users List</Typography>
        <TextField
          variant="outlined"
          sx={{ ...customInput.dark, width: '22.68rem' }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={styles.inputAdornment}>
                  {searchText ? (
                    <Clear
                      onClick={() => setSearchText('')}
                      sx={{
                        cursor: 'pointer',
                        color: theme.palette.text.hint,
                      }}
                    />
                  ) : (
                    <Search sx={{ color: 'grey' }} />
                  )}
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
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Sales Center</TableCell>
                <TableCell>Kiosk Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user: UserDetailsModal) => (
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
                    <Box sx={{ display: 'flex', opacity: 1 }}>
                      <IconButton
                        onClick={() => {
                          onEditClick(user);
                        }}
                      >
                        <EditIcon sx={styles.editIcon} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setSelectedUserToDelete(user.userUid);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <DeleteIcon sx={styles.deleteIcon} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={styles.deleteModalContainer}>
          <CancelIcon
            sx={styles.deleteModalCancelIcon}
            onClick={() => setOpenDeleteModal(false)}
          />
          <Box component="img" src={DeleteModalImg} />

          <Typography
            variant="body1"
            gutterBottom
            sx={styles.deleteModalConfirmText}
          >
            Are you sure you want to delete this User?
          </Typography>
          <Box sx={styles.deleteModalBtnContainer}>
            <Button
              variant="outlined"
              sx={styles.deleteModalCancelButton}
              onClick={() => setOpenDeleteModal(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={styles.deleteModalConfirmButton}
              onClick={() => onDeleteUser(selectedUserToDelete)}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  ) : (
    <UserForm
      user={selectedUser}
      onRefetchTrigger={onRefetchTrigger}
      onClose={onClose}
      setIsEdit={setIsEdit}
    />
  );
}

export default UsersTab;
