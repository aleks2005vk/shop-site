import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

/* icons for drawer/menu */
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadsetIcon from "@mui/icons-material/Headset";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WatchIcon from "@mui/icons-material/Watch";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./styles.css";

export default function Header() {
  const [isOpen, setOpen] = React.useState(false);
  const navLinks = ["More", "Today's Deals", "Best Sellers"];

  const menuItems = [
    { label: "Mobile Phones", icon: <PhoneIphoneIcon /> },
    { label: "Laptops", icon: <LaptopMacIcon /> },
    { label: "Headphones", icon: <HeadsetIcon /> },
    { label: "Cameras", icon: <CameraAltIcon /> },
    { label: "Smartwatches", icon: <WatchIcon /> },
    { label: "Accessories", icon: <LocalOfferIcon /> },
  ];

  const toggleDrawer = () => setOpen((s) => !s);

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar>
            {/* left: burger + logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                aria-label="menu"
                size="large"
              >
                <MenuIcon />
              </IconButton>

              <div className="logo">SHOP</div>
            </Box>

            {/* center: search */}
            <div className="navCenter">
              <div className="searchBox">
                <InputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  sx={{ ml: 1, flex: 1, color: "#fff" }}
                />
                <button className="searchBtn" aria-label="search-button">
                  <SearchIcon sx={{ fontSize: 18 }} />{" "}
                </button>
              </div>
            </div>

            {/* right: nav links + icons */}
            <div className="navRight">
              <nav className="topLinks" aria-label="top-navigation">
                {navLinks.map((l) => (
                  <Button key={l} className="topLinkBtn" disableRipple>
                    {l}
                  </Button>
                ))}
              </nav>

              <div className="iconWithBadge" title="Cart">
                <Badge badgeContent={3} color="error">
                  <ShoppingCartIcon sx={{ color: "#fff" }} />
                </Badge>
              </div>

              <div className="iconWithBadge" title="Profile">
                <Avatar sx={{ width: 36, height: 36, bgcolor: "transparent" }}>
                  <AccountCircleIcon sx={{ color: "#fff", fontSize: 26 }} />
                </Avatar>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 300, p: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 20 }}>SHOP</div>
          </div>

          <Divider sx={{ my: 2 }} />

          <List>
            {menuItems.map((it) => (
              <ListItem key={it.label} disablePadding>
                <ListItemButton>
                  <span className="menuIcon">{it.icon}</span>
                  <ListItemText
                    primary={it.label}
                    secondary={<span className="menu-sub">Explore {it.label.toLowerCase()}</span>}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <div className="drawer-footer">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Need help?</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              Contact support or check our Help Center.
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}
