import React from "react";
import {
  Grid,
} from "@mui/material";
import Appbar from "../Menu/Menu";
import {Route, Routes} from 'react-router-dom';
import {ROUTER} from '../../utils/routers';

import Review from "../Review/review";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function Home() {
  const accountCheck = JSON.parse(localStorage.getItem('account'))
  return (
    <>
      <Grid container justifyContent="center" style={{backgroundColor:'#565559', padding:'10px'}}>
        <Appbar account={accountCheck}/>
        <Routes>
          <Route exact path={ROUTER.HOME} element={<Review />} />
          <Route exact path={ROUTER.THE_LOAI} element={<Review />} />
          <Route exact path={ROUTER.DANG_KY} element={<Register />} />
          <Route exact path={ROUTER.DANG_NHAP} element={<Login accountCheck={accountCheck}/>} />
        </Routes>
      </Grid>
    </>
  );
}
