import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaHome } from "react-icons/fa";
import { FaBars, FaCommentDots } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BottomNav() {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{py: 1}}
      >
        <BottomNavigationAction LinkComponent={Link} to="/" label="Home" icon={<FaHome size={20}/>} />
        <BottomNavigationAction LinkComponent={Link} to="/topics"  label="Topics" icon={<FaBars size={20}/>} />
        <BottomNavigationAction LinkComponent={Link} to="/posts"  label="Posts" icon={<FaCommentDots size={20}/>} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;
