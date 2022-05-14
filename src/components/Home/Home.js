import React from "react";
import {
  Grid,
} from "@mui/material";
import Appbar from "../Menu/Menu";
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import {ROUTER} from '../../utils/routers';

import Review from "../Review/review";
import Register from "../Register/Register"

export default function Home() {

  return (
    <>
      <Grid container justifyContent="center" style={{backgroundColor:'#565559', padding:'10px'}}>
        <Appbar />
        <Routes>
          <Route exact path={ROUTER.HOME} element={<Review />} />
          <Route exact path={ROUTER.DANG_KY} element={<Register />} />
        </Routes>
      </Grid>
    </>
  );
}
