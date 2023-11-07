import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to generate a unique hash for the user document ID
  const generateUserDocId = () => {
    // You can use a library like uuid or generate your own unique hash
    // For simplicity, this example generates a random 8-character alphanumeric string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSignUp = async () => {
    try {
      // Add confirmation password validation here (compare password and confirm password)
      // Display error message if they don't match
  
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response from the server
        navigation.navigate('Home');
      } else {
        throw new Error('Signup request failed');
      }
    } catch (error) {
      // Handle signup error and display an error message to the user
      console.log(error);
      // Display error message to the user, e.g., using a toast or error component
    }
  };

  const handleBack = async () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#23282a', flex: 3 }}>
        <View style={styles.background}>
          <Text style={styles.title}>FeedMe</Text>
          <Text style={styles.subtitle}>Be in control of what you eat</Text>
        </View>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#f2f2f2"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#f2f2f2"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#f2f2f2"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#f2f2f2"
          secureTextEntry
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleBack}>
          <Text style={styles.signUpButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#23282a',
    alignItems: 'center',
    marginTop: 40,
  },
  mainContainer: {
    backgroundColor: 'seagreen',
    borderRadius: 15,
    flex: 5,
    padding: 20,
    marginTop: -20,
  },
  title: {
    color: 'seagreen',
    fontSize: 72,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 10,
  },
  input: {
    height: 55,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#f2f2f2',
    padding: 10,
    color: '#f2f2f2',
  },
  signUpButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: 'seagreen',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
