import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Scrollbars from "react-custom-scrollbars";
import { Link, useNavigate } from "react-router-dom";


import axios from 'axios';
import {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import "./Header.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const CustomScrollbars = styled(Scrollbars)`
  /* Add your custom scrollbar styles here */
  width: 100%;
  height: 100%;

  /* Track */
  .track-vertical {
    background-color: transparent;
  }

  /* Thumb */
  .thumb-vertical {
    background-color: #888;
    border-radius: 5px;
  }

  /* Thumb on hover */
  .thumb-vertical:hover {
    background-color: #555;
  }
`;

export default function Sidenav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activetab, setActivetab] = React.useState("");
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event, tab) => {
    setActivetab(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDClose = () => {
    setDialogOpen(false);
  };



  const managerId = localStorage.getItem('managerId')
  // console.log(managerId)

  
  const handleChangePassword = async() => {
    try {
      const data ={
        managerId:managerId,
        oldPassword:currentPassword,
        newPassword
      }
      const res = await axios.patch('http://localhost:8888/api/manager/change-pass',data);
      if(res.status === 200){
        alert(res.data.message)
        setDialogOpen(false);
      }
      else{
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <div className="header-component">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                color: 'black',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'black' }}
            >
              {activetab}
            </Typography>
            <Button
              color="inherit"
              sx={{ marginLeft: 'auto', color: 'black' }}
              onClick={handleClickOpen}
            >
              Change Password
            </Button>
          </Toolbar>
        </div>
      </AppBar>

      <Dialog open={dialogOpen} onClose={handleDClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your current password and your new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDClose}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>

      <Drawer variant="permanent" open={open}>
        <Scrollbars
          sx={{
            backgroundColor: "black",
          }}
        >
          <div className="two">
            <DrawerHeader>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffccf6",
                  },
                }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>

            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <div className="menuitems-of-header ">
                  <Link
                    to="/quotation"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      className={
                        activetab === "Enquiry"
                          ? "menuitems-of-header active"
                          : "menuitems-of-header"
                      }
                      onClick={(event) => handleClick(event, "Enquiry")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Enquiry">
                          <TaskTwoToneIcon sx={{ color: "#9b59b6" }} />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        primary="Enquiry"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </div>
              </ListItem>
            </List>

            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <div className="menuitems-of-header ">
                  <Link
                    to="/viewtask"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      className={
                        activetab === "Update Task"
                          ? "menuitems-of-header active"
                          : "menuitems-of-header"
                      }
                      onClick={(event) => handleClick(event, "Update Task")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Update Task">
                          <ReceiptIcon sx={{ color: "#9b59b6" }} />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        primary="Update Task"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </div>
              </ListItem>
            </List>

            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <div className="menuitems-of-header ">
                  <Link
                    to="/vendorpayment"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      className={
                        activetab === "Vendor Payment"
                          ? "menuitems-of-header active"
                          : "menuitems-of-header"
                      }
                      onClick={(event) => handleClick(event, "Vendor Payment")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Vendor Payment">
                          <TaskTwoToneIcon sx={{ color: "#9b59b6" }} />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        primary="Vendor Payment"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </div>
              </ListItem>
            </List>

            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <div className="menuitems-of-header ">
                  <Link
                    to="/expenseform"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      className={
                        activetab === "Expense Form"
                          ? "menuitems-of-header active"
                          : "menuitems-of-header"
                      }
                      onClick={(event) => handleClick(event, "Expense Form")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Expense Form">
                          <ReceiptIcon sx={{ color: "#9b59b6" }} />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        primary="Expense Form"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </div>
              </ListItem>
            </List>

            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <div className="menuitems-of-header ">
                  <Link
                    to="/eventdetails"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      className={
                        activetab === "Event Details"
                          ? "menuitems-of-header active"
                          : "menuitems-of-header"
                      }
                      onClick={(event) => handleClick(event, "Event Details")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Event Details">
                          <TaskTwoToneIcon sx={{ color: "#9b59b6" }} />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText
                        primary="Event Details"
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </div>
              </ListItem>
            </List>

            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleLogout}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip title="Logout">
                      <LogoutOutlinedIcon
                        sx={{
                          color: "red",
                          "&:hover": {
                            color: " rgba(201, 141, 141)",
                          },
                        }}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        sx={{
                          color: "white",
                          backgroundColor: "red",
                          "&:hover": {
                            backgroundColor: "rgba(201, 141, 141)",
                          },
                        }}
                      >
                        Logout
                      </Button>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
          </div>
        </Scrollbars>
      </Drawer>
    </Box>
  );
}
