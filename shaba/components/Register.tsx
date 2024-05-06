import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { axiosInstance } from '../api/axios'; // Importa tu instancia de Axios desde tu archivo de configuración

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/register', formData);
      console.log('Registro exitoso:', response.data);
      // Aquí podrías redirigir al usuario a otra pantalla o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al registrar:', error);
      // Aquí podrías manejar el error de alguna manera, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#FFC0CB']} style={styles.background} />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => handleChange('firstName', text)}
        value={formData.firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => handleChange('lastName', text)}
        value={formData.lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={text => handleChange('address', text)}
        value={formData.address}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => handleChange('email', text)}
        value={formData.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => handleChange('password', text)}
        value={formData.password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={text => handleChange('phone', text)}
        value={formData.phone}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff', // Blanco
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
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

export default Register;
