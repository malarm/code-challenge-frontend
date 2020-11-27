import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import { AppContext } from '../AppContext';
import { getToken } from '../api';

const styles = (theme) => ({
  containerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
  paperStyle: {
    height: '40vh',
    width: '30vw',
    padding: 20,
    backgroundColor: theme.palette.secondary.light,
  },
  textFieldStyle: {
    width: '60%',
    padding: 5,
    marginTop: 10,
  },
});
const Login = (props) => {
  const { classes } = props;
  const history = useHistory();
  const [isLogging, setIsLogging] = useState(false);
  const [token, setToken] = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState(null);
  const onSubmit = async (data) => {
    const loginResponse = await getToken(data);
    if (loginResponse?.token) {
      setToken(loginResponse.token);
      setLoginError(null);
      history.replace('/orders');
    } else if (loginResponse?.error) {
      setLoginError(`${loginResponse?.error} : ${loginResponse?.message}`);
    } else {
      setLoginError('Internal Error! contact admin');
    }
  };
  return (
    <div className={classes.containerStyle}>
      <Paper elevation={10} className={classes.paperStyle}>
        <form>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.paperStyle}
          >
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>WineAndBarells</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-email-input"
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                className={classes.textFieldStyle}
                inputRef={register({
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid Email Address',
                  },
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                })}
                error={!!errors.email}
                helperText={errors?.email?.message ?? ''}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                className={classes.textFieldStyle}
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                })}
                error={!!errors.password}
                helperText={errors?.password?.message ?? ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" startIcon={isLogging ? <CircularProgress size={20} color="secondary" /> : <AccountCircleIcon />} onClick={handleSubmit(onSubmit)}>
                <Typography variant="button" style={{ marginLeft: 5 }}>Login</Typography>
              </Button>
              {
                loginError && <Typography variant="subtitle2" style={{ color: 'red', marginTop: 10 }}>{loginError}</Typography>
              }
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Login);
