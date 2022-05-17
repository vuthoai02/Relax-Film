import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Link,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Appbar(props) {
  const [open, setOpen] = React.useState(false);
  const { account } = props;
  const pages = [
    {
      label: "Trang chủ",
      link: "/",
      icon:<HomeIcon />
    },
    {
      label: "Thể loại",
      link: "/the-loai",
      icon:<ListAltIcon />
    },
  ];

  const mobileMode = window.innerWidth <= 768;

  return (
    <>
      {mobileMode ? (
        <>
          <AppBar
            style={{
              backgroundColor: "black",
              height: "6vh",
              position: "fixed",
              top: 0,
              zIndex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              href="/"
              component="a"
              sx={{
                fontFamily: "monospace",
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                margin: "10px",
                width: "100px",
              }}
            >
              <b>RELAXFILM</b>
            </Typography>
            <IconButton
              onClick={() => setOpen(true)}
              style={{ display: "inline-block", width: "100px", color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>
          </AppBar>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Box style={{width:'50vw'}}>
              <List>
                {pages.map((elm, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      setOpen(false);
                      window.location.assign(elm.link);
                    }}
                  >
                    <ListItemIcon>{elm.icon}</ListItemIcon>
                    <ListItemText primary={elm.label} />
                  </ListItemButton>
                ))}
                {account?.accept ? (
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      window.location.assign("/");
                    }}
                  >
                    <ListItemIcon><LoginIcon /></ListItemIcon>
                    <ListItemText primary={"Đăng xuất"} />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      window.location.assign("/dang-nhap");
                    }}
                  >
                    <ListItemIcon><LoginIcon /></ListItemIcon>
                    <ListItemText primary={"Đăng nhập"} />
                  </ListItemButton>
                )}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <AppBar
          position="static"
          style={{
            backgroundColor: "black",
            height: "8vh",
            position: "fixed",
            top: 0,
            zIndex: 1,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RELAXFILM
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.link}
                    underline="none"
                    style={{
                      color: "white",
                      display: "block",
                      margin: "0 10px",
                    }}
                  >
                    {page.label}
                  </Link>
                ))}
              </Box>
              <Box>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {props.account?.accept ? (
                  <Button
                    onClick={() =>
                      localStorage.setItem(
                        "account",
                        JSON.stringify({ ...props.account, accept: false })
                      )
                    }
                    style={{ color: "#fff" }}
                  >
                    Đăng xuất
                  </Button>
                ) : (
                  <Button
                    onClick={() => window.location.assign("/dang-nhap")}
                    style={{ color: "#fff" }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
