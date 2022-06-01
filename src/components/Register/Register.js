import React from "react";
import {
  FormControl,
  Grid,
  Paper,
  TextField,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Button,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ROUTER } from "../../utils/routers";
import axios from "axios";

export default function Register() {
  const [values, setValues] = React.useState({
    userName: "",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const mobileMode = window.innerWidth <= 768;
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.post('https://filmserverrelax.herokuapp.com/api/accounts', {
      data: {
        email: values.userName,
        password: values.password
      }
    },
    {
      "content-type": "application/json",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNTQ0NjA4LCJleHAiOjE2NTYxMzY2MDh9._TNfETDmzyLaacHg8pN8ntZl6pNS8S3Xw9Ejv6ai38s'
    })
    if(response.status === 200){
      localStorage.setItem('id',response.data.data.id);
      window.location.assign(ROUTER.DANG_NHAP);
    }
  }

  return (
    <>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper style={{ padding: "20px 20px 20px 90px", width: mobileMode ? '60%' : '20%', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
          <div>
          </div>
          <Typography variant="h5"><b>Đăng ký tài khoản</b></Typography>
          <div style={{ marginTop: '10px', display: 'inline-block' }}>
            <TextField
              id="userName"
              label="Tên đăng nhập"
              multiline
              maxRows={4}
              value={values.userName}
              onChange={handleChange("userName")}
              style={{ width: '80%' }}
            />
          </div>
          <div style={{ marginTop: "10px", display: 'inline-block' }}>
            <FormControl sx={{ m: 1, width: mobileMode ? "30ch" : "33.5ch", padding: 0, margin: '0' }} variant="outlined">
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <Button onClick={handleSubmit} variant="contained" style={{ margin: '10px 0', width: '80%' }}>Đăng ký</Button>
          <Link underline="none" href="/"> Quay lại trang chủ</Link>
        </Paper>
      </Grid>
    </>
  );
}
