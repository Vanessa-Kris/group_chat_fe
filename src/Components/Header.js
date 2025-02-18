import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

function Header() {
  const [selectedTab, setSelectedTab] = useState('forYou');

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      gap={4} 
      borderColor="divider"
      marginBottom={15}
      sx={{ bgcolor: 'background.paper', py: 1, position: 'fixed', top: 48, left: 0, right: 0, zIndex: 2,}}
    >
      <Typography
        variant="body1"
        onClick={() => setSelectedTab('forYou')}
        sx={{
          cursor: 'pointer',
          pb: 1,
          borderBottom: selectedTab === 'forYou' ? '1px solid white' : 'none',
          color: selectedTab === 'forYou' ? 'white' : 'gray',
          fontWeight: selectedTab === 'forYou' ? '1px' : 'normal',
        }}
      >
        For You
      </Typography>

      <Typography
        variant="body1"
        onClick={() => setSelectedTab('trending')}
        sx={{
          cursor: 'pointer',
          pb: 1,
          borderBottom: selectedTab === 'trending' ? '1px solid white' : 'none',
          color: selectedTab === 'trending' ? 'white' : 'gray',
          fontWeight: selectedTab === 'trending' ? '1px' : 'normal',
        }}
      >
        Trending
      </Typography>
    </Box>
  );
}

export default Header;
