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
import { Box } from "@mui/system";

export default function Login(props) {
  const {accountCheck} = props;
  const [values, setValues] = React.useState({
    userName:"",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [error,setError] = React.useState(false);
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

  const handleSubmit = () =>{
    const account = {userName:values.userName,password:values.password}
    if(account.userName === accountCheck.userName && account.password === accountCheck.password){
      setError(false)
      localStorage.setItem('account',JSON.stringify({userName:values.userName,password:values.password,accept:true}));
      window.location.assign("/");
    }else{
      setError(true)
    }
  }

  return (
    <>
      <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh' }}>
        <Paper style={{ padding: "20px 20px 20px 90px",width:mobileMode?'60%':'20%', display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center' }}>
          <div>
          </div>
          <Typography variant="h5"><b>Đăng nhập</b></Typography>
          {error?<Typography style={{color:'red'}}>Tài khoản hoặc mật khẩu không đúng!</Typography>:null}
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
            <FormControl sx={{ m: 1, width: mobileMode?"30ch":"33.5ch", padding:0, margin:'0' }} variant="outlined">
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
          <Button onClick={handleSubmit} variant="contained" style={{margin:'10px 0', width:'80%'}}>Đăng nhập</Button>
          <Box style={{display:'flex', justifyContent:'space-between',width:'80%'}}>
            <Link underline="none" href="/"> Quay lại trang chủ</Link>
            <Link underline="none" href="/dang-ky"> Đăng ký</Link>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
