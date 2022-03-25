import React from 'react';
import { connect } from 'react-redux';
import GuestHomeScreen from './GuestHomeScreen';
import UserHomeNavigatorScreen from '../navigation/UserHomeNavigatorScreen';

const HomeScreen = (props) => {
  if (props.Login.isLoggedIn)
    return <UserHomeNavigatorScreen navigation={props.navigation}/>;
  else
    return <GuestHomeScreen navigation={props.navigation}/>;
}

const mapStateToProps = (state) => {
  const { Login } = state
  return { Login }
};

export default connect(mapStateToProps)(HomeScreen);