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
import {ROUTER} from "../../utils/routers";

export default function Register() {
  const [values, setValues] = React.useState({
    userName:"",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
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

  const handleSubmit = () =>{
    const account = {userName:values.userName,password:values.password,accept:false}
    localStorage.setItem('account',JSON.stringify(account));
    window.location.assign(ROUTER.DANG_NHAP);
  }

  return (
    <>
      <Grid item xs={12} style={{ marginTop: "8vh", display:'flex',justifyContent:'center',alignItems:'center',height:'100vh' }}>
        <Paper style={{ padding: "20px 20px 20px 90px",width:'20%', display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center' }}>
          <div>
          </div>
          <Typography variant="h5"><b>Đăng ký tài khoản</b></Typography>
          <div style={{marginTop:'10px',display:'inline-block'}}>
            <TextField
              id="userName"
              label="Tên đăng nhập"
              multiline
              maxRows={4}
              value={values.userName}
              onChange={handleChange("userName")}
              style={{width:'80%'}}
            />
          </div>
          <div style={{ marginTop: "10px",display:'inline-block' }}>
            <FormControl sx={{ m: 1, width: "33.5ch", padding:0, margin:'0' }} variant="outlined">
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
          <Button onClick={handleSubmit} variant="contained" style={{margin:'10px 0', width:'80%'}}>Đăng ký</Button>
          <Link underline="none" href="/"> Quay lại trang chủ</Link>
        </Paper>
      </Grid>
    </>
  );
}
