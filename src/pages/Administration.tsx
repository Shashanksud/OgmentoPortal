import React from 'react';
import { Grid, TextField, Button, IconButton, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

const groups = [
  { value: 'group1', label: 'Group 1' },
  { value: 'group2', label: 'Group 2' },
];

function Administration() {
  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        position: 'relative',
      }}
    >
      <IconButton
        style={{ position: 'absolute', top: 10, right: 10 }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <h2>Add/Edit User</h2>

      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              placeholder="Enter Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              placeholder="Enter Email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Select Group" variant="outlined">
              {groups.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Select Role" variant="outlined">
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Enter Password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Validity Days"
              variant="outlined"
              defaultValue="365"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="City" variant="outlined">
              {/* Populate this with city options */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Kiosk Name" variant="outlined">
              {/* Populate this with kiosk name options */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Sales Center" variant="outlined">
              {/* Populate this with sales center options */}
            </TextField>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          style={{ marginTop: '20px' }}
        >
          <Grid item>
            <Button variant="contained">Cancel</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Administration;
