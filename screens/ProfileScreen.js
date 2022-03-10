import React from 'react';
import { Button, Headline, Paragraph } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {styles} from '../styles/styles';
import { logout } from '../store/LoginReducer';
import { connect } from 'react-redux';

const ProfileScreen = (props) => {
  React.useLayoutEffect(() => {
    console.log("conole", props);
  }, []);
  const _onLogoutPressed = () => {
    props.dispatch(
      logout()
    )
    .then(success => {props.navigation.navigate('HomeScreen');})
    .catch(err => {
        const credentialError = credentialsValidator(err.response.status);

        if (credentialError.email) {
          setEmail({ ...email, error: credentialError.email });
          return;
        }
      }
    );
  };

  return (
    <Background>
      <Logo />
      <Headline>Profile</Headline>

      <Button style={styles.button} mode="contained" onPress={_onLogoutPressed}>
        Logout
      </Button>
     
    </Background>
  );
}
const mapStateToProps = (state) => {
  const { Login } = state
  return { Login }
};

export default connect(mapStateToProps)(ProfileScreen);