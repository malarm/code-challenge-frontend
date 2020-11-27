import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppContext } from '../AppContext';
import { updateOrder } from '../api';
import { ToastContext } from '../ToastContext';

const styles = (theme) => ({
  containerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
});

const OrderDetail = (props) => {
  const { classes } = props;
  const location = useLocation();
  const [token, setToken] = useContext(AppContext);
  const history = useHistory();
  const { order } = location.state;
  const [toastState, setToastState] = useContext(ToastContext);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: order,
  });
  const onSubmit = async (data) => {
    const updatedObj = { ...order, ...data };
    const res = await updateOrder(updatedObj, token);
    if (res?.error) {
      console.error(res?.error);
      setToastState({ open: true, msg: 'Error updating order!' });
    } else {
      setToastState({ open: true, msg: 'Order successfully updated!!' });
      history.replace('/orders');
    }
  };

  return (
    <div className={classes.containerStyle}>
      <Paper elevation={10} style={{ minHeight: '70%', width: '50%' }}>
        <form>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
            spacing={8}
            style={{
              width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 15, marginBottom: 15, height: '100%',
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">{`Order - ${order.Id}`}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Invoice"
                type="text"
                name="InvoiceNumber"
                variant="outlined"
                inputRef={register()}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Origin"
                type="text"
                name="Origin"
                variant="outlined"
                inputRef={register()}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Status"
                type="text"
                name="Status"
                variant="outlined"
                inputRef={register()}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Total"
                type="text"
                name="Total"
                variant="outlined"
                inputRef={register()}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Delivered On"
                type="text"
                name="DateDelivered"
                variant="outlined"
                inputRef={register()}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tracking Code"
                type="text"
                name="TrackingCode"
                variant="outlined"
                inputRef={register()}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Order Comments"
                type="text"
                name="OrderComment"
                variant="outlined"
                inputRef={register()}
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Delivered Comments"
                type="text"
                name="DeliveryComment"
                variant="outlined"
                inputRef={register()}
                multiline
                fullWidth
              />
            </Grid>
            <Grid xs={12}>

              <Button color="primary" onClick={() => history.replace('/orders')} style={{ marginRight: 30 }}>
                <Typography variant="button">Cancel</Typography>
              </Button>
              <Button variant="contained" color="primary" startIcon={formState.isSubmitting ? <CircularProgress size={20} color="secondary" /> : <AccountCircleIcon />} onClick={handleSubmit(onSubmit)}>
                <Typography variant="button" style={{ marginLeft: 5 }}>Save</Typography>
              </Button>

            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(OrderDetail);
