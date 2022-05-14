import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";

export default function Register(){

  return (
    <>
      <Grid item xs={12}>
        <FormControl variant="standard">
        <TextField
          id="outlined-multiline-flexible"
          label="Tên đăng nhập"
          multiline
          maxRows={4}
          // value={value}
          // onChange={handleChange}
        />
        </FormControl>
      </Grid>
    </>
  );
}