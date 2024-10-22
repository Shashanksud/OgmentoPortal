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
} from '@mui/material';
import { useState } from 'react';
import { globalStyles } from '@/GlobalStyles/sharedStyles';

interface AddsPage {
  name: string;
  video: string;
  salesCenter: string;
  kioskName: string;
  enableDisable: boolean;
}

function Advertisement() {
  const theme = useTheme();
  const styles = globalStyles(theme);
  const [adds, setAdds] = useState<AddsPage[]>([]);
  console.log(setAdds);
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
              {adds.map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.name}>
                  <TableCell>{user.video}</TableCell>
                  <TableCell>{user.salesCenter}</TableCell>
                  <TableCell>{user.kioskName}</TableCell>
                  <TableCell>{user.enableDisable}</TableCell>

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
export default Advertisement;
