import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-backend-url.com/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert('Login successful');
      } else {
        Alert.alert('Login failed');
      }
    } catch (error: any) {
      Alert.alert('An error occurred while logging in');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const response = await axios.post('http://your-backend-url.com/api/google-login', {
        idToken: userInfo.idToken,
      });

      if (response.data.success) {
        Alert.alert('Google login successful');
      } else {
        Alert.alert('Google login failed');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Google sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services not available or outdated');
      } else {
        Alert.alert('An error occurred while logging in with Google');
      }
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        Alert.alert('Facebook login cancelled');
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();

        const response = await axios.post('http://your-backend-url.com/api/facebook-login', {
          accessToken: accessToken.accessToken,
        });

        if (response.data.success) {
          Alert.alert('Facebook login successful');
        } else {
          Alert.alert('Facebook login failed');
        }
      }
    } catch (error: any) {
      Alert.alert('An error occurred while logging in with Facebook');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Log in" onPress={handleLogin} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Log in with Google" onPress={handleGoogleLogin} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Log in with Facebook" onPress={handleFacebookLogin} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
});

export default Login;
