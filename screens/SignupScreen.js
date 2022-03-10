import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Headline, Paragraph, Text } from 'react-native-paper';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { connect } from 'react-redux';
import {styles} from '../styles/styles';
import { emailValidator, passwordValidator, credentialsValidator, nameValidator } from '../Utilities';
import { signup } from '../store/LoginReducer';

const SignupScreen = (props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '', error: '' });

  const _onSignUpPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const nameError = nameValidator(name.value);

    if (emailError || passwordError || nameError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setName({ ...name, error: nameError });
      return;
    }

    props.dispatch(
      signup({
        name: name.value,
        email: email.value,
        password: password.value,
      })
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
  

  React.useLayoutEffect(() => {
    console.log("conole", props);
  }, []);

    return (
      <Background>
        <Logo />
        <Headline>Create Account</Headline>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="none"
          autoCompleteType="name"
          textContentType="name"
        />

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
      

      <Button style={styles.button} mode="contained" onPress={_onSignUpPressed}>
        SIGN UP
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>
      </View>
      </Background>
    );
}

const mapStateToProps = (state) => {
  const { Login } = state
  return { Login }
};

export default connect(mapStateToProps)(SignupScreen);