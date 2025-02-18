import { AppBar, Avatar, Box, IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <Box component={AppBar} sx={{ flexGrow: 1, p: 1, position: 'fixed', top: 0, left: 0, right: 0, bgcolor: "#000", zIndex: 1}}>
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
                <Avatar/>
            </Grid>
            <Grid item>
                <Typography variant='body1' sx={{fontWeight: 600}}> Group Chat Web </Typography>
            </Grid>
            <Grid item>
                <IconButton size='small' LinkComponent={Link} to="/search">
                    <FaMagnifyingGlass/>
                </IconButton>
            </Grid>
        </Grid>
    </Box>
  )
}

export default TopNav