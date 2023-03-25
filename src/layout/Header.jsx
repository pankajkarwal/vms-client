import React,{useState} from 'react'
import { InternetConnectivityStatus } from '@opensource/bit-scope.internet-connectivity-status'
import  Toolbar  from '@material-ui/core/Toolbar';
import { IconButton, MenuItem, Typography } from '@mui/material';
import { MenuIcon } from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons/AccountCircle';
import Menu from "@material-ui/core/Menu";
import constant from '../utils/constant';

export default function Header({classes}) {
  const  [open,setOpen] = useState(false)
  const  [anchorEl,setAnchorEl] = useState(null)  
  
  const handleDrawerOpen = () => {
    setOpen(!open );
  };

  const handleDrawerClose = () => {
    setOpen(false );
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget );
  };

  const handleClose = () => {
    setAnchorEl(null );
  };
  return (
    <div>
        <InternetConnectivityStatus />
        {/* <Toolbar disableGutters={true}>
         
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed
                }}
              />
            </IconButton>
            <InternetConnectivityStatus />
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              {constant.LABEL_CONSTANTS.DASHBOARD.APP_NAME}
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
             
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar> */}
    </div>
  )
}
