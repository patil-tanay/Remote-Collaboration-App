import * as React from "react";
import "../index.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/MoveToInbox";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../context/Chatprovider";

import GroupChatModal from "../components/GroupChatModal";
import UserProfile from "../components/UserProfile";
import SingleChat from "../components/SingleChat";
import UpdateGroupChatModal from "../components/UpdateGroupChatModal";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import Switch from "@mui/material/Switch";
import UserSelf from "../components/UserSelf";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
// import useLocalStorage from "use-local-storage";

export default function Chatpanel() {
  const [loggedUser, setLoggedUser] = useState();
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = ChatState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const openNotf = Boolean(anchorE3);
  const open2 = Boolean(anchorE2);
  const [open3, setOpen3] = React.useState(false);
  const matches = useMediaQuery("(min-width:1000px)");
  const drawerWidth = matches ? 240 : 0;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
        console.log(res);
        setSearchResults(res);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const accessChat = async (userId, user) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ userId }),
      });
      const res = await response.json();
      if (response.ok) {
        if (!chats.find((chat) => chat._id === res._id)) {
          setChats([res, ...chats]);
        }
        console.log(res);

        setFetchAgain(!fetchAgain);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [fetchAgain, setFetchAgain] = useState(false);
  const fetchChats = async () => {
    setLoading(true);
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/v1/chat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const res = await response.json();
      if (response.ok) {
        console.log(res);
        setLoading(false);
        setChats(res);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    console.log("Chats Fetched!!!");
    fetchChats();
  }, [navigate, user, fetchAgain]);

  return (
    <Box sx={{ display: "flex", bgcolor: "var(--background)" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth + 64}px)`,
          backgroundColor: "var(--background-2)",
          color: "var(--background)",
        }}
      >
        <Toolbar>
          <UserProfile user={user} selectedChat={selectedChat} />
          <Typography variant="h6" noWrap component="div" padding={"0px 20px"}>
            {selectedChat
              ? selectedChat.isGroupChat
                ? selectedChat.chatName
                : getSender(loggedUser, selectedChat.users)
              : "Chat App"}
          </Typography>

          {selectedChat && selectedChat.isGroupChat && (
            <IconButton sx={{ marginLeft: "auto", padding: "10px" }}>
              <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 64,
            boxSizing: "border-box",
            backgroundColor: "var(--background-3)",
            color: "var(--text-1)",
            left: 0,
            overflow: "hidden",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}

        <List>
          {["Avatar", "Home", "Add", "More", "Notification"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton sx={{ padding: 0 }}>
                  {(() => {
                    switch (index) {
                      case 0:
                        return <UserSelf user={user} />;
                      case 1:
                        return (
                          <Tooltip title="Home">
                            <HomeIcon
                              sx={{
                                margin: "10px 15px",
                                color: "var(--background)",
                                width: "30px",
                                height: "30px",
                              }}
                              onClick={() => {
                                setSelectedChat(null);
                              }}
                            />
                          </Tooltip>
                        );
                      case 2:
                        return (
                          <div>
                            <GroupChatModal
                              fetchAgain={fetchAgain}
                              setFetchAgain={setFetchAgain}
                            />
                          </div>
                        );
                      case 3:
                        return (
                          <div>
                            <Tooltip title="More">
                              <Button
                                id="basic-button2"
                                aria-controls={
                                  open2 ? "basic-menu2" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open2 ? "true" : undefined}
                                onClick={handleClick2}
                                sx={{ left: "0px" }}
                              >
                                <MoreHorizIcon
                                  sx={{
                                    color: "var(--background)",
                                    width: "30px",
                                    height: "30px",
                                  }}
                                />
                              </Button>
                            </Tooltip>
                            <Menu
                              id="basic-menu2"
                              anchorEl={anchorE2}
                              open={open2}
                              onClose={handleClose2}
                              MenuListProps={{
                                "aria-labelledby": "basic-button2",
                              }}
                            >
                              <MenuItem onClick={null}>
                                Change Background
                              </MenuItem>
                              <MenuItem onClick={null}>
                                Switch Mode
                                <Switch />
                              </MenuItem>
                              <MenuItem onClick={null}>Feedback</MenuItem>
                            </Menu>
                          </div>
                        );

                      case 4:
                        return (
                          <div>
                            <Button
                              id="basic-button2"
                              aria-controls={
                                openNotf ? "basic-menu-notification" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={openNotf ? "true" : undefined}
                              onClick={(e) => {
                                setAnchorE3(e.currentTarget);
                              }}
                              sx={{ left: "0px" }}
                            >
                              <Tooltip
                                title={
                                  notifications.length > 0
                                    ? "Click to see new notifications"
                                    : "no new notifications"
                                }
                              >
                                <Badge
                                  badgeContent={notifications.length}
                                  color="secondary"
                                >
                                  <NotificationsIcon
                                    sx={{
                                      color: "var(--background)",
                                      width: "30px",
                                      height: "30px",
                                    }}
                                  />
                                </Badge>
                              </Tooltip>
                            </Button>
                            <Menu
                              id="basic-menu-notification"
                              anchorEl={anchorE3}
                              open={openNotf}
                              onClose={() => setAnchorE3(null)}
                              MenuListProps={{
                                "aria-labelledby": "basic-button-notification",
                              }}
                            >
                              {notifications.length === 0 ? (
                                <MenuItem onClick={null}>
                                  No new messages
                                </MenuItem>
                              ) : (
                                notifications.map((notification) => (
                                  <MenuItem
                                    key={notification._id}
                                    onClick={() => {
                                      setSelectedChat(notification.chat);
                                      setNotifications(
                                        notifications.filter(
                                          (n) => n._id !== notification._id
                                        )
                                      );
                                      setAnchorE3(null);
                                    }}
                                  >
                                    {notification.chat.isGroupChat
                                      ? `New message in ${notification.chat.chatName}`
                                      : `New Message from ${getSender(
                                          loggedUser,
                                          notification.chat.users
                                        )}`}
                                  </MenuItem>
                                ))
                              )}
                            </Menu>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })()}
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <IconButton
          sx={{ padding: "10px", marginBottom: "5px", marginTop: "auto" }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/desktop-2");
          }}
        >
          <Tooltip title="Logout" placement="right">
            <LogoutIcon
              sx={{
                color: "var(--background)",
                width: "30px",
                height: "30px",
              }}
            />
          </Tooltip>
        </IconButton>
      </Drawer>

      <Drawer
        sx={{
          width: drawerWidth,
          left: 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "var(--background-2)",
            color: "var(--text-1)",
            left: 64,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ py: 2.15 }}>
          <Paper
            component="form"
            sx={{
              p: "0.5px 2px",
              display: "flex",
              alignItems: "center",
              width: 400,
              height: 40,
            }}
          >
            <Button
              sx={{
                width: "100%",
                fontSize: "16px",
                color: "#751CCA",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              aria-label="search"
              onClick={() => setOpen3(!open3)}
            >
              <SearchIcon
                sx={{
                  color: "#751CCA",
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              Search Users
            </Button>
          </Paper>
          <Dialog open={open3} onClose={() => setOpen3(false)}>
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
              <InputBase
                autoFocus
                fullWidth
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchResults.length > 0 && (
                <List>
                  {searchResults.map((result) => (
                    <ListItem
                      key={result._id}
                      sx={{
                        backgroundColor: "#EDE4F5",
                        borderRadius: "10px",
                        margin: "5px 0",
                        padding: "5px 10px",
                        width: "300px",
                      }}
                      onClick={() => {
                        accessChat(result._id, user);
                      }}
                    >
                      <ListItemText
                        primary={result.name}
                        secondary={result.email}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen3(false)}>Cancel</Button>
              <Button onClick={handleSearch}>Search</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
        <Divider color="#fff" />
        <List sx={{ px: 1 }}>
          {loading ? (
            <CircularProgress
              sx={{
                margin: "20px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                color: "var(--background)",
              }}
            />
          ) : (
            chats &&
            chats.map((chat) => (
              <ListItem
                key={chat._id}
                sx={{
                  backgroundColor:
                    chat === selectedChat ? "var(--background-3)" : "#751CCA",

                  border: chat === selectedChat ? "1px solid" : "none",
                  borderColor: "var(--background)",
                  borderRadius: "6px",
                  margin: "5px 0",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setSelectedChat(chat);
                }}
              >
                <ListItemText>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </ListItemText>
              </ListItem>
            ))
          )}
        </List>

        <List>
          {[].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "var(--background)" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "var(--background)", p: 0 }}
      >
        {/* <Toolbar /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0px",
            height: "100vh",
            width: "100%",
            bgcolor: "var(--background)",
            padding: 0,
            margin: 0,
          }}
        >
          <SingleChat selectedChat={selectedChat} />
        </Box>
      </Box>
    </Box>
  );
}
