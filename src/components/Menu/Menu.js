import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Link,
  Button
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@material-ui/icons/Search";

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Appbar(props) {
  const pages = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Thể loại",
      link: "/",
    },
  ];

  return (
    <>
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
{/* 
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              ></IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                 {pages.map((page,index) => (
                  <MenuItem key={index}>
                    <Link href={page.link}><Typography textAlign="center">{page.label}</Typography></Link>
                  </MenuItem>
                ))} 
              </Menu>
            </Box> */}
            {/* <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page,index) => (
                <Link
                  key={index}
                  href={page.link}
                  underline="none"
                  style={{color: "white", display: "block", margin:'0 10px'}}
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
              {props.account?.accept?(
                <Button onClick={() => localStorage.setItem('account',JSON.stringify({...props.account,accept:false}))} style={{color:'#fff'}}>Đăng xuất</Button>
              ):(
                <Button onClick={()=> window.location.assign("/dang-nhap")} style={{color:'#fff'}}>Đăng nhập</Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
