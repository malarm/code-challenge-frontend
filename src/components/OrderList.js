/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  CircularProgress, Typography, Grid, IconButton,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { AppContext } from '../AppContext';
import { fetchOrders } from '../api';

const styles = (theme) => ({
  containerStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',

  },
  tableContainer: {
    minHeight: '60vh',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: 15,
  },
});

const OrderList = (props) => {
  const { classes } = props;
  const [isFetching, setIsFetching] = useState(false);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    async function getOrderList() {
      if (token === null) {
        history.replace('/');
      } else {
        setIsFetching(true);
        const res = await fetchOrders(token);
        setOrders(res);
        setIsFetching(false);
      }
    }
    getOrderList();
  }, []);
  return (
    <div className={classes.containerStyle}>
      {
        isFetching ? <CircularProgress color="primary" size={40} /> : (
          <Grid
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              { orders.length > 0
              && (
              <TableContainer component={Paper} elevation={10} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow color="primary">
                      <TableCell className={classes.tableHeader}>#</TableCell>
                      <TableCell className={classes.tableHeader}>Invoice</TableCell>
                      <TableCell className={classes.tableHeader}>Status</TableCell>
                      <TableCell className={classes.tableHeader}>Order Delivered</TableCell>
                      <TableCell className={classes.tableHeader}>Order Comment</TableCell>
                      <TableCell className={classes.tableHeader}>Origin</TableCell>
                      <TableCell className={classes.tableHeader}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.Id}
                        </TableCell>
                        <TableCell>{row.InvoiceNumber}</TableCell>
                        <TableCell>{row.Status}</TableCell>
                        <TableCell>{row.DateDelivered}</TableCell>
                        <TableCell>{row.OrderComment}</TableCell>
                        <TableCell>{row.Origin}</TableCell>
                        <TableCell><IconButton color="primary" onClick={() => history.push({ pathname: '/orderDetail', state: { order: row } })}><EditIcon /></IconButton></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              )}
            </Grid>
          </Grid>
        )
      }
    </div>
  );
};

export default withStyles(styles)(OrderList);
