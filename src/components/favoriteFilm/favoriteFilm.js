/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Grid, Paper, Typography, Card, CardMedia, CardActions, Button, Drawer, Box, IconButton, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

export default function FavoriteFilm(props) {

  const datas = props.datas?.[0].attributes.data;
  const mobileMode = window.innerWidth <= 768;
  const [open, setOpen] = useState(false);
  const [valueDrawer, setValueDrawer] = useState(null);
  const [tapPhim, setTapPhim] = useState(0);
  const account = JSON.parse(localStorage.getItem("account"));

  const handleDelete = async () => {
    const response = await axios.put(`https://filmserverrelax.herokuapp.com/api/favorite-films/${props.id}`,
      {
        data: {
          userId: props.userId,
          data: JSON.stringify([
            ...datas.filter(elm => elm.id !== valueDrawer.id)
          ])
        }
      },
      {
        "content-type": "application/json",
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNTQ0NjA4LCJleHAiOjE2NTYxMzY2MDh9._TNfETDmzyLaacHg8pN8ntZl6pNS8S3Xw9Ejv6ai38s'
      })
    console.log(response)
  }
  return (
    <>
      <Grid item xs={12} style={{ marginTop: "8vh", padding: "10px", maxWidth:'1115px' }}>
        {datas ? (
          <>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                width:mobileMode?"90%":"80%",
                margin: mobileMode?"10px 1%":"10px 10%", 
                display: 'flex'
              }}
            >
              {datas.map((data, index) => (
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
                      <Button variant="contained" onClick={() => handleDelete()}><DeleteIcon />Xóa khỏi danh sách xem sau</Button>
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
          </>
        ) :
          <Typography>Nội dung trống</Typography>}
      </Grid>
    </>
  );
}