import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

import { IoMdClose } from "react-icons/io";

import logo from "../../assets/logo_dashboard.jpeg";

import { useAuthContext } from "../../contexts/authContext";

const CustomDrawer = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen({ ...drawerOpen, open });
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <List>
        <ListItem key="Dashboard">
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/");
            }}
          >
            Dashboard
          </ListItemButton>
        </ListItem>

        <ListItem key="MyWallet">
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/my-wallet");
            }}
          >
            My Wallet
          </ListItemButton>
        </ListItem>

        <ListItem key="AboutUs">
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/about-us");
            }}
          >
            About Us
          </ListItemButton>
        </ListItem>
        <ListItem key="contactUs">
          <ListItemButton
            onClick={() => {
            setDrawerOpen(false);
              navigate("/contact-us");
            }}
          >
            Contact Us
          </ListItemButton>
        </ListItem>
        <ListItem key="contactUs">
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/my-team");
            }}
          >
            My Team
          </ListItemButton>
        </ListItem>

        {/* <ListItem key="contactUs">
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/team-tree");
            }}
          >
           Team Tree
          </ListItemButton>
        </ListItem> */}

        {user?.type === "admin" && (
          <ListItem key="search">
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate("/search-user");
              }}
            >
              Search
            </ListItemButton>
          </ListItem>
        )}

        {user.type === "admin" && (
          <ListItem key="MyTeam">
            <ListItemButton
              onClick={() => {
                toggleDrawer(true);
                navigate("/boost-board");
              }}
            >
              Boost Board
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        key="drawersm"
        size="sm"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div className="absolute right-5 top-4 text-3xl z-10">
          <span className="cursor-pointer" onClick={() => setDrawerOpen(false)}>
            <IoMdClose />
          </span>
        </div>

        <div className="flex justify-center items-center h-[185px]">
          <img
            src={logo}
            alt="digitalmetaone"
            height="120px"
            width="120px"
            className="rounded-full object-cover"
          />
        </div>
        {list("sm")}
      </Drawer>
    </React.Fragment>
  );
};

export default CustomDrawer;
