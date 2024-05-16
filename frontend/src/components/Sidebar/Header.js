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
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Scrollbars from "react-custom-scrollbars";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import GridViewIcon from "@mui/icons-material/GridView";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Tooltip from "@mui/material/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

import {
  faUserPlus,
  faAddressBook,
  faCalendar,
  faMoneyBill,
  faHandHoldingUsd,
  faMoneyCheck,
  faClipboardList,
  faFileDownload,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./../Dashboard/Dashboard";

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
  const [open, setOpen] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activetab, setActivetab] = React.useState();
  const navigate = useNavigate();
  const handleClick = (event, tab) => {
    // Pass tab as argument
    setAnchorEl(event.currentTarget);
    setActivetab(tab); // Update active tab state
  };

  // Function to handle closing menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    // window.location.href = 'https://eventmanagement-qaii.onrender.com';
    navigate("/");
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
                ...(open && { display: "none" }),
                color: "black",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "black",
              }}
            >
              {activetab}
            </Typography>
          </Toolbar>
        </div>
      </AppBar>

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
                    backgroundColor: "#ffccf6", // Adjust alpha for desired faintness
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
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Add Users")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/addmanager"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    className={
                      activetab === "Add Users"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title=" ">
                        <span>
                          <PersonAddIcon sx={{ color: "#9b59b6" }} />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Add Users"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
              
            </List>

            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "User Details")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/managerdetails"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    className={
                      activetab === "User Details"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="User Details">
                        <span>
                          <FontAwesomeIcon
                            icon={faAddressBook}
                            size="lg"
                            color="#9b59b6"
                          />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary=" User Details"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
            </List>


            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Enquiry")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/addenquiry"
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
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Enquiry">
                        <span>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            size="lg"
                            color="#9b59b6"
                          />
                        </span>
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
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, " View Event")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/viewevent"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === " ViewEvent"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="View Event">
                        <span>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            size="lg"
                            color="#9b59b6"
                          />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="View Event"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
             
            </List>


            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Advance Payment")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/advpaymentmanager"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Advance Payment"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Advance Payment">
                        <span>
                          <FontAwesomeIcon
                            icon={faHandHoldingUsd}
                            size="lg"
                            color="#9b59b6"
                          />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Advance Payment"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
             
            </List>

           
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Attendance")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/attendance"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Attendance"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Attendance">
                        <span>
                          <FontAwesomeIcon
                            icon={faMoneyCheck}
                            size="lg"
                            color="#9b59b6"
                          />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Attendance"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
              
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Update Task")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/updatetask"
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
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Update Task">
                        <span>
                          <TaskTwoToneIcon sx={{ color: "#9b59b6" }} />
                        </span>
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
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Salary")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/addsalary"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Salary"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Salary">
                        <span>
                          <AccountBalanceWalletTwoToneIcon
                            sx={{ color: "#9b59b6" }}
                          />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Salary"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>

             
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Internal Transfer")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/internaltransferfrombank"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Internal Transfer"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Internal Transfer">
                        <span>
                          <AssignmentIndIcon sx={{ color: "#9b59b6" }} />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Internal Transfer"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>

             
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Master")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/master"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Master"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Master">
                        <span>
                          <AssignmentIndIcon sx={{ color: "#9b59b6" }} />
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Master"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>

             
            </List>

            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Inventory Stock")}
              >
                <div className="menuitems-of-header ">
                <Link
                    to="/newgodown"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Inventory Stock"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Inventory Stock">
                        <span>
                          <FontAwesomeIcon
                            icon={faClipboardList}
                            color="#9b59b6"
                            size="lg"
                          />{" "}
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Inventory Stock"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
             
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Download Report")}
              >
                <div className="menuitems-of-header">
                <Link
                    to="/eventreport"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      activetab === "Download Report"
                        ? "menuitems-of-header active"
                        : "menuitems-of-header"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Tooltip title="Download Report">
                        <span>
                          <FontAwesomeIcon
                            icon={faFileDownload}
                            size="lg"
                            color="#9b59b6"
                          />{" "}
                        </span>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText
                      primary="Download Report"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  </Link>
                </div>
              </ListItem>
             
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Logout")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip title="Logout">
                      <span>
                        <LogoutOutlinedIcon
                          size="lg"
                          sx={{
                            color: "red",
                            "&:hover": {
                              color: " rgba(201, 141, 141)", // Adjust alpha for desired faintness
                            },
                          }}
                          onClick={handleLogout}
                        />{" "}
                      </span>
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
                            backgroundColor: "rgba(201, 141, 141)", // Adjust alpha for desired faintness
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
