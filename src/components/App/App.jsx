import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MapComponent from '../MapComponent/MapComponent';
import DetailsPage from '../DetailsPage/DetailsPage';
import Search from '../Search/Search';
import AddPin from '../AddPin/AddPin';
import MyPins from '../MyPins/MyPins';
import EditPin from '../EditPin/EditPin';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // add custom theme for Material UI
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#556b2f',
        light: '#6e893c'
      },
      secondary: {
        main: '#e8d776',
        light: '#f9fbe7',
        dark: '#A29652',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/map" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route path="/details/:id" exact>
            <DetailsPage />
          </Route>

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/map"
          >
            <InfoPage />
          </Route>

          <Route 
            exact
            path="/addpin"
          >
            {user.id ? <AddPin /> : <Redirect to="/login" />}
          </Route> 

          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/search"
          >
            <Search />
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/mypins"
          >
            <MyPins />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/mypins/:id/edit"
          >
            <EditPin />
          </ProtectedRoute>
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>
           
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Link to="/details">
          Details
        </Link> */}
        <MapComponent className='mapComponent' />
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;