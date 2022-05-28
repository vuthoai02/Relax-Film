/* eslint-disable jsx-a11y/iframe-has-title */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Drawer,
  Typography,
  IconButton,
  Link,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import {ROUTER} from '../../utils/routers';

export default function Review(props) {
  const [film, setFilm] = useState(null);
  const [danhMuc, setDanhMuc] = useState(null);
  const [valueDrawer, setValueDrawer] = useState(null);
  const [open, setOpen] = useState(false);
  const [tapPhim, setTapPhim] = useState(0);
  const account = JSON.parse(localStorage.getItem("account"));
  const location = window.location.pathname;
  const mobileMode = window.innerWidth <= 768;
  React.useEffect(() => {
    const loaddata = async () => {
      const response = await axios.get(
        `https://filmserverrelax.herokuapp.com/api/films`
      );
      const data = response.data.data;
      setFilm(data);
      if (location.includes('the-loai')) {
        console.log(location.includes('the-loai'))
        if (location.includes('/phim-trung-quoc')) {
          setDanhMuc([{
            label: "Phim Trung Quốc",
            phim: data.filter((elm) => elm.attributes.country === "Trung Quốc"),
          }]);
        }
        else if (location.includes('/phim-au-my')) {
          setDanhMuc([{
            label: "Phim Âu Mỹ",
            phim: data.filter((elm) => elm.attributes.country === "Âu Mỹ"),
          }]);
        }
        else if (location.includes('/phim-hanh-dong')) {
          setDanhMuc([{
            label: "Phim Hành động",
            phim: data.filter((elm) =>
              elm.attributes.kind.includes("Hành động")
            ),
          }]);
        }
        else if (location.includes('/phim-phieu-luu')) {
          setDanhMuc([{
            label: "Phim Phiêu Lưu",
            phim: data.filter((elm) => elm.attributes.kind.includes("lưu")),
          }]);
        }
        else if (location.includes('/phim-tam-ly')) {
          setDanhMuc([{
            label: "Phim Tâm Lý",
            phim: data.filter((elm) => elm.attributes.kind.includes("lý")),
          }]);
        }
        else if (location.includes('/phim-vien-tuong')) {
          setDanhMuc([{
            label: "Phim Viễn Tưởng",
            phim: data.filter((elm) => elm.attributes.kind.includes("tưởng")),
          }]);
        }
        else if (location.includes('/phim-hinh-su')) {
          setDanhMuc([{
            label: "Phim Hình Sự",
            phim: data.filter((elm) => elm.attributes.kind.includes("sự")),
          }]);
        }
        else if (location.includes('/phim-am-nhac')) {
          setDanhMuc([{
            label: "Phim Âm Nhạc",
            phim: data.filter((elm) => elm.attributes.kind.includes("nhạc")),
          }]);
        }
        else if (location.includes('/phim-le')) {
          setDanhMuc([{
            label: "Phim Lẻ",
            phim: data.filter((elm) => elm.attributes.type === "odd"),
          }]);
        }
        else if (location.includes('/phim-tinh-cam')) {
          setDanhMuc([{
            label: "Phim Chính Kịch, Tình Cảm",
            phim: data.filter(
              (elm) =>
                elm.attributes.kind.includes("kịch") ||
                elm.attributes.kind.includes("cảm")
            ),
          }]);
        }
        else if (location.includes('/hoat-hinh')) {
          setDanhMuc([{
            label: "Hoạt Hình",
            phim: data.filter((elm) => elm.attributes.type === "hoathinh"),
          }]);
        }
      } else {
        console.log(location.includes('the-loai'))

        setDanhMuc([
          {
            label: "Phim Trung Quốc",
            to:ROUTER.THE_LOAI.PHIM_TRUNG,
            phim: data
              .filter((elm) => elm.attributes.country === "Trung Quốc")
              .slice(0, 4),
          },
          {
            label: "Phim Âu Mỹ",
            to:ROUTER.THE_LOAI.PHIM_MY,
            phim: data
              .filter((elm) => elm.attributes.country === "Âu Mỹ")
              .slice(0, 4),
          },
          {
            label: "Phim Hành động",
            to:ROUTER.THE_LOAI.PHIM_HANH_DONG,
            phim: data
              .filter((elm) => elm.attributes.kind.includes("Hành động"))
              .slice(0, 4),
          },
          {
            label: "Phim Phiêu Lưu",
            to:ROUTER.THE_LOAI.PHIM_PHIEU_LUU,
            phim: data
              .filter((elm) => elm.attributes.kind.includes("lưu"))
              .slice(0, 4),
          },
        ]);
      }
    };
    loaddata();
  }, []);
  return (
    <Grid item xs={12} style={{ marginTop: "8vh", padding: "10px" }}>
      {film ? (
        <>
          {props.searchValue ? (
            <>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  width: mobileMode ? "95%" : "80%",
                  margin: "10px 0",
                }}
              >
                {film
                  .filter((elm) =>
                    elm.attributes.name
                      .toUpperCase()
                      .includes(props.searchValue.toUpperCase())
                  )
                  .map((data, index) => (
                    <Card
                      key={index}
                      style={{
                        margin: "10px",
                        width: mobileMode ? "200px" : "auto",
                      }}
                    >
                      <CardActions>
                        <Button
                          onClick={() => {
                            setValueDrawer(data);
                            setOpen(!open);
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            component="img"
                            style={{
                              width: mobileMode ? "200px" : "300px",
                              height: mobileMode ? "250px" : "440px",
                            }}
                            image={data.attributes.img_url}
                            alt=""
                          />
                          <Typography
                            style={{
                              fontSize: "12px",
                              marginTop: "2px",
                              color: "#000",
                            }}
                          >
                            {data.attributes.name}
                          </Typography>
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
              </Paper>
            </>
          ) : (
            <>
              {location.includes('the-loai') === false ? (
                <>
                  <Typography
                    variant="h4"
                    style={{ padding: "5px 10px", color: "yellow" }}
                  >
                    Phim mới ra mắt
                  </Typography>
                  <Divider style={{ marginBottom: "10px" }} />
                  <Slide slidesToShow={mobileMode ? 1 : 3}>
                    {film.slice(-10).map((elm, index) => (
                      <div
                        className="each-slide"
                        key={index}
                        style={{ marginLeft: mobileMode ? "3%" : "25%" }}
                      >
                        <Button
                          onClick={() => {
                            setValueDrawer(elm);
                            setOpen(!open);
                          }}
                          style={{
                            width: "320px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <img
                            alt=""
                            src={elm.attributes.img_url}
                            style={{
                              width: mobileMode ? "150px" : "300px",
                              maxHeight: "700px",
                              height: mobileMode ? "200px" : "400px",
                            }}
                          />
                          <Typography
                            style={{ marginTop: "10px", color: "#fff" }}
                          >
                            {elm.attributes.name}
                          </Typography>
                        </Button>
                      </div>
                    ))}
                  </Slide>
                </>
              ) : null}
              <Typography
                variant="h4"
                style={{ padding: "5px 10px", color: "yellow" }}
              >
                Danh mục phim
              </Typography>
              <Divider style={{ marginBottom: "10px" }} />
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {danhMuc ? (
                  <>
                    {danhMuc.map((elm, index) => (
                      <Paper
                        key={index}
                        elevation={3}
                        style={{
                          padding: "20px",
                          width: mobileMode ? "95%" : "80%",
                          margin: "10px 0",
                        }}
                      >
                        <Typography style={{ fontSize: "18px" }}>
                          <b>{elm.label}</b>
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: mobileMode ? "center" : "normal",
                            alignItems: mobileMode ? "center" : "normal",
                          }}
                        >
                          {elm.phim.map((data, ind) => (
                            <Card
                              key={ind}
                              style={{
                                margin: "10px",
                                width: mobileMode ? "230px" : "auto",
                              }}
                            >
                              <CardActions>
                                <Button
                                  onClick={() => {
                                    setValueDrawer(data);
                                    setOpen(!open);
                                  }}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    style={{
                                      width: mobileMode ? "200px" : "300px",
                                      height: mobileMode ? "250px" : "440px",
                                    }}
                                    image={data.attributes.img_url}
                                    alt=""
                                  />
                                  <Typography
                                    style={{
                                      fontSize: "12px",
                                      marginTop: "2px",
                                      color: "#000",
                                    }}
                                  >
                                    {data.attributes.name}
                                  </Typography>
                                </Button>
                              </CardActions>
                            </Card>
                          ))}
                        </div>
                        {location === "/" && (
                          <Button
                            onClick={() => window.location.assign(elm.to)}
                          >
                            Xem thêm
                          </Button>
                        )}
                      </Paper>
                    ))}
                  </>
                ) : null}
                {valueDrawer ? (
                  <Drawer
                    anchor="right"
                    open={open}
                    onClose={() => setOpen(!open)}
                  >
                    <Box
                      style={{
                        padding: "10px 5%",
                        backgroundColor: "#565559",
                        width: "100vw",
                      }}
                    >
                      <Box style={{ display: "flex" }}>
                        <IconButton
                          onClick={() => {
                            setValueDrawer(null);
                            setOpen(!open);
                          }}
                          style={{ color: "#fff", marginRight: "8%" }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        <Typography
                          variant={mobileMode ? "h6" : "h4"}
                          style={{ color: "#fff" }}
                        >
                          <b>{valueDrawer.attributes.name}</b>
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <iframe
                          src={
                            valueDrawer.attributes.episodes[0].server_data[
                              tapPhim
                            ]?.link_embed
                          }
                          width={mobileMode ? "90%" : "80%"}
                          height={mobileMode ? "250px" : "800px"}
                          allowFullScreen
                          style={{ margin: "10px 10%" }}
                        ></iframe>
                        <Box style={{ width: "80%" }}>
                          <Button variant="contained" onClick={() => props.handleSaveFilm(valueDrawer)}><BeenhereIcon />Thêm vào xem sau</Button>
                          <Typography style={{ color: "#fff" }}>
                            Tập phim:
                          </Typography>
                          {valueDrawer.attributes.episodes[0].server_data.map(
                            (elm, index) => (
                              <Button
                                style={{
                                  color: "#fff",
                                  border: "1px solid #fff",
                                  margin: "5px",
                                  backgroundColor:
                                    index === tapPhim ? "green" : null,
                                }}
                                onClick={() => setTapPhim(index)}
                              >
                                {index + 1}
                              </Button>
                            )
                          )}
                          <Typography style={{ color: "#fff" }}>
                            Tải xuống:
                            {account ? (
                              <a
                                href={
                                  valueDrawer.attributes.episodes[0]
                                    .server_data[tapPhim]?.link_m3u8
                                }
                              >
                                Tại đây
                              </a>
                            ) : (
                              <Link href="/dang-nhap">Đăng nhập</Link>
                            )}
                          </Typography>
                        </Box>
                        <Paper
                          style={{
                            padding: "20px 4px",
                            width: "80%",
                            margin: "5px 10%",
                          }}
                        >
                          <Typography>
                            <b>Tóm tắt nội dung</b>
                            <br />
                            {valueDrawer.attributes.content}
                          </Typography>
                          <Typography>
                            <b>Trailer</b>:
                            <a href={valueDrawer.attributes.trailer_url}>
                              {valueDrawer.attributes.trailer_url}
                            </a>
                          </Typography>
                          <Typography>
                            <b>Diễn viên</b>:{valueDrawer.attributes.actor}...
                          </Typography>
                          <Typography>
                            <b>Năm phát hành</b>: {valueDrawer.attributes.year}
                          </Typography>
                          <Typography>
                            <b>Số tập</b>:{" "}
                            {
                              valueDrawer.attributes.episodes[0].server_data
                                .length
                            }
                          </Typography>
                          <Typography>
                            <b>Quốc gia</b>:{valueDrawer.attributes.country}
                          </Typography>
                        </Paper>
                      </Box>
                    </Box>
                  </Drawer>
                ) : null}
              </Grid>
            </>
          )}
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
          <Typography style={{ marginLeft: "10px" }}>
            Đợi một chút...
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
