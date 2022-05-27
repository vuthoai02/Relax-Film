import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Link,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  InputAdornment,
  Input,
  MenuItem,
  Menu,
  Accordion,
  AccordionSummary,
  AccordionActions
} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoginIcon from "@mui/icons-material/Login";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {ROUTER} from '../../utils/routers';

export default function Appbar(props) {
  const [open, setOpen] = React.useState(false);
  const { account, handleChange, searchValue } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const mobileMode = window.innerWidth <= 768;
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (url) => {
    window.location.assign('/the-loai' + url);
  };
  const handleCloseMenu = (url) => {
    setAnchorEl(null);
  };
  const pages = [
    {
      label: "Trang chủ",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Thể loại",
      icon: <ListAltIcon />,
      render: (
        <>
          {mobileMode ? (
            <Accordion>
              <AccordionSummary ><ListAltIcon /><span style={{marginLeft:'28px'}}>Thể loại</span></AccordionSummary>
              <AccordionActions style={{display:'flex', flexDirection:'column',alignItems:'flex-start'}}>
                <Button onClick={() => handleClose('/phim-trung-quoc')}>Phim Trung Quốc</Button>
                <Button onClick={() => handleClose('/phim-au-my')}>Phim Âu Mỹ</Button>
                <Button onClick={() => handleClose('/phim-hanh-dong')}>Phim Hành động</Button>
                <Button onClick={() => handleClose('/phim-phieu-luu')}>Phim Phiêu Lưu</Button>
                <Button onClick={() => handleClose('/phim-tam-ly')}>Phim Tâm Lý</Button>
                <Button onClick={() => handleClose('/phim-vien-tuong')}>Phim Viễn Tưởng</Button>
                <Button onClick={() => handleClose('/phim-hinh-su')}>Phim Hình Sự</Button>
                <Button onClick={() => handleClose('/phim-am-nhac')}>Phim Âm Nhạc</Button>
                <Button onClick={() => handleClose('/phim-le')}>Phim Lẻ</Button>
                <Button onClick={() => handleClose('/phim-tinh-cam')}>
                  Phim Chính Kịch, Tình Cảm
                </Button>
                <Button onClick={() => handleClose('/hoat-hinh')}>Phim Hoạt Hình</Button>
              </AccordionActions>
            </Accordion>
          ) : (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleClose('/phim-trung-quoc')}>Phim Trung Quốc</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-au-my')}>Phim Âu Mỹ</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-hanh-dong')}>Phim Hành động</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-phieu-luu')}>Phim Phiêu Lưu</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-tam-ly')}>Phim Tâm Lý</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-vien-tuong')}>Phim Viễn Tưởng</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-hinh-su')}>Phim Hình Sự</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-am-nhac')}>Phim Âm Nhạc</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-le')}>Phim Lẻ</MenuItem>
              <MenuItem onClick={() => handleClose('/phim-tinh-cam')}>
                Phim Chính Kịch, Tình Cảm
              </MenuItem>
              <MenuItem onClick={() => handleClose('/hoat-hinh')}>Phim Hoạt Hình</MenuItem>
            </Menu>
          )}
        </>
      ),
    },
    {
      label: "Phim đã lưu",
      link: "/da-luu",
      icon: <LibraryAddIcon />,
    },
  ];

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
              zIndex: 9999,
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
            <Box style={{ width: "50vw", marginTop:'8vh' }}>
              <List>
                {pages.map((elm, index) => (
                  <>
                    {elm.render ? (
                      <>{elm.render}</>
                    ) : (
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
                    )}
                  </>
                ))}
                {account ? (
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      window.location.assign(ROUTER.HOME);
                      localStorage.setItem(
                        "accept",
                        false
                      )
                    }}
                  >
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Đăng xuất"} />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() => {
                      setOpen(false);
                      window.location.assign("/dang-nhap");
                    }}
                  >
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", alignItems: "center" },
                }}
              >
                {pages.map((page, index) => (
                  <>
                    {page.render ? (
                      <>
                        <Button
                          style={{
                            padding: 0,
                            color: "#fff",
                            textTransform: "none",
                            margin: "0 10px",
                            display: "inline-block",
                            fontSize: "16px",
                          }}
                          onClick={handleClick}
                        >
                          {page.label}
                        </Button>
                        {page.render}
                      </>
                    ) : (
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
                    )}
                  </>
                ))}
              </Box>
              <Box
                style={{
                  backgroundColor: "#fff",
                  padding: "5px",
                  borderRadius: "2px",
                }}
              >
                <Input
                  id="search"
                  type="text"
                  value={searchValue}
                  placeholder="Tìm kiếm"
                  onChange={handleChange("search")}
                  endAdornment={
                    <InputAdornment possition="end">
                      <IconButton onClick={() => console.log(searchValue)}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {props.account ? (
                  <Button
                    onClick={() =>{
                      localStorage.setItem(
                        "accept",
                        false
                      );
                      window.location.assign(ROUTER.HOME);
                    }}
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
