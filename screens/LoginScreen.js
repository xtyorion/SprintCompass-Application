import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Headline, Paragraph, Text } from 'react-native-paper';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { connect } from 'react-redux';
import {styles} from '../styles/styles';
import { emailValidator, passwordValidator, credentialsValidator } from '../Utilities';
import { login } from '../store/LoginReducer'

const LoginScreen = (props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const _onLoginPressed = async () => {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      props.dispatch(
        login({
          email: email.value,
          password: password.value,
        })
      )
      .then(success => {props.navigation.navigate('HomeScreen');})
      .catch(err => {
          const credentialError = credentialsValidator(err.response.status);

          if (credentialError.email) {
            setEmail({ ...email, error: credentialError.email });
            setPassword({ ...password, error: credentialError.password });
            return;
          }
        }
      );


      
      //Check login
      
     // navigation.navigate('Dashboard');
    };
    

    React.useLayoutEffect(() => {
      console.log("conole", props);
    }, []);

    return (
      <Background>
        <Logo />
        <Headline>Welcome back.</Headline>

        <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button style={styles.button} mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignupScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </Background>
    );
}

const mapStateToProps = (state) => {
  const { Login } = state
  return { Login }
};

export default connect(mapStateToProps)(LoginScreen);