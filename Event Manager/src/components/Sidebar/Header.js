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
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Scrollbars from "react-custom-scrollbars";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link, useNavigate } from "react-router-dom";

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
  const [open, setOpen] = React.useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activetab, setActivetab] = React.useState();
  const navigate = useNavigate();
  const handleClick = (event, tab) => {
    setActivetab(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
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
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Enquiry")}
              >
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
                            <TaskTwoToneIcon
                              sx={{ color: "#9b59b6" }}
                              title="Enquiry"
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
                onClick={(event) => handleClick(event, "Advance Payment")}
              >
                <div className="menuitems-of-header">
                  <Link
                    to="/advpaycus"
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
                            <AccountBalanceWalletTwoToneIcon
                              sx={{ color: "#9b59b6" }}
                              title="Advance Payment"
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
                onClick={(event) => handleClick(event, "Vendor Payment")}
              >
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
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Vendor Payment">
                          <span>
                            <TaskTwoToneIcon
                              sx={{ color: "#9b59b6" }}
                              title="Vendor Payment"
                            />
                          </span>
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
  <ListItem
    disablePadding
    sx={{ display: "block" }}
    onClick={(event) => handleClick(event, "Expense Form")}
  >
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
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Expense Form">
              <span>
                <ReceiptIcon sx={{ color: "#9b59b6" }} /> {/* Use the new icon */}
              </span>
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
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={(event) => handleClick(event, "Event Details")}
              >
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
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Tooltip title="Event Details">
                          <span>
                            <TaskTwoToneIcon
                              sx={{ color: "#9b59b6" }}
                              title="Event Details"
                            />
                          </span>
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
                              color: " rgba(201, 141, 141)",
                            },
                          }}
                          onClick={handleLogout}
                        />
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
