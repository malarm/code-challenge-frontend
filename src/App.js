import React, { useContext } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { AppContextProvider } from './AppContext';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import { ToastContext } from './ToastContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#841618',

      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fae1e1',
      light: '#fcf5f5',
    },
  },
});

function App() {
  const [toastState, setToastState] = useContext(ToastContext);
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastState({ open: false, msg: '' });
  };
  return (

    <ThemeProvider theme={theme}>
      <div className="App">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={toastState.open}
          onClose={handleToastClose}
          message={toastState.msg}
          autoHideDuration={5000}
        />
        <Router>
          <AppContextProvider>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/orders" exact component={OrderList} />
              <Route path="/orderDetail" exact component={OrderDetail} />
            </Switch>
          </AppContextProvider>
        </Router>
      </div>

    </ThemeProvider>

  );
}

export default App;
