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
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Review(props) {
  const [film, setFilm] = useState(null);
  const [danhMuc, setDanhMuc] = useState(null);
  const [valueDrawer, setValueDrawer] = useState(null);
  const [open, setOpen] = useState(false);
  const [tapPhim, setTapPhim] = useState(0);
  React.useEffect(() => {
    const loaddata = async () => {
      const response = await axios.get(
        `https://filmserverrelax.herokuapp.com/api/films`
      );
      const data = response.data.data;
      setFilm(data);
      setDanhMuc([
        {
          label: "Phim Trung Quốc",
          phim: data.filter((elm) => elm.attributes.country === "Trung Quốc"),
        },
        {
          label: "Phim Âu Mỹ",
          phim: data.filter((elm) => elm.attributes.country === "Âu Mỹ"),
        },
        {
          label: "Phim Hành động",
          phim: data.filter((elm) => elm.attributes.kind.includes("Hành động")),
        },
        {
          label: "Phim Phiêu Lưu",
          phim: data.filter((elm) => elm.attributes.kind.includes("lưu")),
        },
      ]);
    };
    loaddata();
  }, []);
  return (
    <Grid item xs={12} style={{ marginTop: "8vh", padding: "10px" }}>
      {film ? (
        <>
          <Typography
            variant="h4"
            style={{ padding: "5px 10px", color: "yellow" }}
          >
            Phim mới ra mắt
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <Slide>
            {film.map((elm, index) => (
              <div className="each-slide" key={index}>
                <div style={{ backgroundColor: "#000" }}>
                  <img
                    alt=""
                    src={elm.attributes.img_url}
                    style={{
                      width: "30%",
                      marginLeft: "35%",
                      maxHeight: "700px",
                    }}
                  />
                </div>
              </div>
            ))}
          </Slide>
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
                    style={{ padding: "20px", width: "80%", margin: "10px 0" }}
                  >
                    <Typography style={{ fontSize: "18px" }}>
                      <b>{elm.label}</b>
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {elm.phim.map((data, ind) => (
                        <Card key={ind} style={{ margin: "0 10px" }}>
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
                                style={{ width: "300px", height: "440px" }}
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
                  </Paper>
                ))}
              </>
            ) : null}
            {valueDrawer ? (
              <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
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
                    <Typography variant="h4" style={{ color: "#fff" }}>
                      <b>{valueDrawer.attributes.name}</b>
                    </Typography>
                  </Box>
                  <Box style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <iframe
                      src={
                        valueDrawer.attributes.episodes[0].server_data[tapPhim]?.link_embed
                      }
                      width="80%"
                      height="800px"
                      style={{ margin: "5px 10%" }}
                    ></iframe>
                    <Box style={{ width: "80%" }}>
                      <Typography style={{color:'#fff'}}>Tập phim:</Typography>
                      {valueDrawer.attributes.episodes[0].server_data.map(
                        (elm, index) => (
                          <Button style={{color:'#fff', border:'1px solid #fff', margin:'5px',backgroundColor:index === tapPhim?'green':null}} onClick={() => setTapPhim(index)}>
                            {index +1}
                          </Button>
                        )
                      )}
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
                        <b>Diễn viên</b>:{valueDrawer.attributes.actor}...
                      </Typography>
                      <Typography>
                        <b>Năm phát hành</b>: {valueDrawer.attributes.year}
                      </Typography>
                      <Typography>
                        <b>Số tập</b>:{" "}
                        {valueDrawer.attributes.episodes[0].server_data.length}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Drawer>
            ) : null}
          </Grid>
        </>
      ) : null}
    </Grid>
  );
}
