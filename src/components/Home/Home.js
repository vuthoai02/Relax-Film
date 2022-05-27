import React, { useState } from "react";
import {
  Grid,
} from "@mui/material";
import Appbar from "../Menu/Menu";
import { Route, Routes } from 'react-router-dom';
import { ROUTER } from '../../utils/routers';

import Review from "../Review/review";
import Register from "../Register/Register";
import Login from "../Login/Login";
import FavoriteFilm from "../favoriteFilm/favoriteFilm";
import axios from 'axios';

export default function Home() {
  const accountCheck = JSON.parse(localStorage.getItem('accept'));
  const [searchValue, setSearchValue] = React.useState(null);
  const [filmSave, setFilmSave] = useState(null);
  const id = JSON.parse(localStorage.getItem('id'));
  const handleChange = (prop) => (event) => {
    setSearchValue(event.target.value);
  };

  React.useEffect(() => {
    const loaddata = async () => {
      const responseSave = await axios.get('https://filmserverrelax.herokuapp.com/api/favorite-films');
      const dataSave = responseSave.data.data? responseSave.data.data.filter(elm => elm.attributes?.userId === id) : [];
      setFilmSave(dataSave);
    }
    loaddata();
  }, []);

  const handleSaveFilm = async (valueDrawer) => {
    if (id) {
      if (filmSave.length !== 0) {
        const response = await axios.put(`https://filmserverrelax.herokuapp.com/api/favorite-films/${filmSave[0]?.id}`,
          {
            data: {
              userId: id,
              data: JSON.stringify([
                ...filmSave?.[0].attributes.data,
                valueDrawer
              ])
            }
          },
          {
            "content-type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNTQ0NjA4LCJleHAiOjE2NTYxMzY2MDh9._TNfETDmzyLaacHg8pN8ntZl6pNS8S3Xw9Ejv6ai38s'
          }
        )
        console.log(response);
      } else {
        const response = await axios.post(`https://filmserverrelax.herokuapp.com/api/favorite-films`,
          {
            data: {
              userId: id,
              data: JSON.stringify([valueDrawer])
            }
          },
          {
            "content-type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNTQ0NjA4LCJleHAiOjE2NTYxMzY2MDh9._TNfETDmzyLaacHg8pN8ntZl6pNS8S3Xw9Ejv6ai38s'
          }
        )
        console.log(response);
      }
    }else{
      alert("Bạn chưa đăng nhập!");
      window.location.assign(ROUTER.DANG_NHAP);
    }
  }

  console.log(filmSave)

  return (
    <>
      <Grid container justifyContent="center" style={{ backgroundColor: '#565559', padding: '10px' }}>
        <Appbar account={accountCheck} handleChange={handleChange} searchValue={searchValue} />
        <Routes>
          <Route exact path={ROUTER.HOME} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_TRUNG} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_MY} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_HANH_DONG} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_PHIEU_LUU} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_TAM_LY} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_VIEN_TUONG} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_HINH_SU} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_AM_NHAC} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_LE} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.PHIM_TINH_CAM} element={<Review save={filmSave} handleSaveFilm={handleSaveFilm} searchValue={searchValue} />} />
          <Route exact path={ROUTER.THE_LOAI.HOAT_HINH} element={<Review searchValue={searchValue} />} />
          <Route exact path={ROUTER.DA_LUU} element={<FavoriteFilm userId={filmSave?.[0]?.attributes.userId} id={filmSave?.[0]?.id} datas={filmSave} searchValue={searchValue} />} />
          <Route exact path={ROUTER.DANG_KY} element={<Register />} />
          <Route exact path={ROUTER.DANG_NHAP} element={<Login accountCheck={accountCheck} />} />
        </Routes>
      </Grid>
    </>
  );
}
