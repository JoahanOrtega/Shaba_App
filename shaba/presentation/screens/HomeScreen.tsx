import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

type ScreenNames = 'SignIn' | 'SignUp';

type NavigationProp = NativeStackNavigationProp<{
  SignIn: undefined;
  SignUp: undefined;
}>;

interface Props {
  navigation: NavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const goToScreen = (screenName: ScreenNames) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#FFC0CB']} style={styles.background} /> {/* Fondo degradado */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/shaba.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Welcome to SHABA!</Text>
      <TouchableOpacity style={styles.button} onPress={() => goToScreen('SignIn')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => goToScreen('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  logoContainer: {
    width: 150,
    height: 150,
    overflow: 'hidden', // Para que el degradado no se propague fuera del contenedor
    marginBottom: 20,
    borderRadius: 75, // Hacer el contenedor redondeado
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajustar la imagen al contenedor
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff', // Blanco
  },
  button: {
    backgroundColor: '#FF69B4', // Rosa
    width: '50%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;


