import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../../services/api';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    IDnumber: '',
    username: '',
    password: '',
  });


 const handleRegister = async () => {
    try {
      const response = await api.post('/auth/register', formData);
      console.log(response.data);
      // Handle success (e.g., show a success message, redirect to login page)
    } catch (error) {
      console.error(error.response.data);
      // Handle error (e.g., show an error message)
    }
  };


 return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Connect with your friend today!</Text>


     <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />
      </View>


     <View style={styles.inputContainer}>
        <Text style={styles.label}>ID Number</Text>
        <View style={styles.idNumberContainer}>
          <TextInput
            placeholder="+46"
            style={[styles.input, styles.idNumberInput]}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({ ...formData, IDnumber: text })}
          />
          <TextInput
            placeholder="Enter your ID number"
            style={[styles.input, styles.idNumberInput]}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({ ...formData, IDnumber: text })}
          />
        </View>
      </View>


     <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
      </View>


     <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
  },
  idNumberContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 22,
  },
  idNumberInput: {
    flex: 1,
    borderRightWidth: 1,
    borderLeftColor: 'grey',
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
    backgroundColor: 'blue',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default RegisterForm;