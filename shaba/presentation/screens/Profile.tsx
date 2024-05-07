import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const Profile: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        currentPassword: '', // Inicializado como cadena vacía
        newPassword: '', // Inicializado como cadena vacía
        confirmPassword: '', // Inicializado como cadena vacía
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/1');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const { first_name, last_name, email, phone, currentPassword, newPassword, confirmPassword } = formData;
  
      const profileData = {
        first_name,
        last_name,
        email,
        phone,
        ...(currentPassword && newPassword && confirmPassword && { currentPassword, newPassword, confirmPassword }),
      };
  
      await axios.put('http://localhost:8000/api/users/1', profileData);
      console.log('Profile data updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFFFF', '#FFC0CB']} style={styles.background} />
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.first_name}
        onChangeText={(text) => handleChange('first_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.last_name}
        onChangeText={(text) => handleChange('last_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <Text style={styles.sectionTitle}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={formData.currentPassword}
        onChangeText={(text) => handleChange('currentPassword', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={formData.newPassword}
        onChangeText={(text) => handleChange('newPassword', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
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
    color: '#FF69B4',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FF69B4',
    width: '50%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Profile;

