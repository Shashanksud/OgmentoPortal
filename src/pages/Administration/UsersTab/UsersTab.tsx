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
  Button,
  Modal,
} from '@mui/material';
import { UserDetailsModal, UserRoles } from '@/Interfaces/Modals/modals';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteData, getData } from '@/services/axiosWrapper/fetch';
import { deleteUserEndpoint, userDetailsEndpoint } from '@/utils/Urls';
import { globalStyles } from '@/GlobalStyles/globalStyles';
import UserForm from './UsersForm/UserForm';
import DeleteModalImg from '../../../assets/Pana_Illustration/Inbox cleanup-pana 1.png';

interface UserFormOpenProps {
  onClose: () => void;
}
function UsersTab(props: UserFormOpenProps) {
  const { onClose } = props;
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [userDetails, setUserDetail] = useState<UserDetailsModal[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetailsModal | null>(
    null
  );
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  console.log(selectedUserToDelete);
  const getSalesCenterNames = (salesCenterNames: { [key: string]: string }) => {
    const allSalesCenterNames = Object.values(salesCenterNames).join(', ');
    return <div>{allSalesCenterNames}</div>;
  };

  const handleEditClick = (user: UserDetailsModal) => {
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
  useEffect(() => {
    fetchData();
  }, [refetchTrigger]);
  const onDeleteUser = async (userUid: string) => {
    await deleteData(deleteUserEndpoint, userUid)
      .then(() => {
        setOpenDeleteModal(false);
        setRefetchTrigger((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                    <IconButton
                      onClick={() => {
                        setSelectedUserToDelete(user.userUid);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <DeleteIcon sx={styles.deleteIcon} />
                    </IconButton>
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
      setRefetchTrigger={setRefetchTrigger}
      onClose={onClose}
      setIsEdit={setIsEdit}
    />
  );
}

export default UsersTab;
