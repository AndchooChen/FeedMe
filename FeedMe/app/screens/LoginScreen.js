import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        navigation.navigate("SignUp")
    };

    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
     
          if (response.ok) {
            const data = await response.json();
            const token = data.token; // Extract the token from the response
      
            // Store the token in local storage or wherever you prefer
            AsyncStorage.setItem('token', token);
      
            // Login successful, you can navigate to the desired screen
            navigation.navigate('Home');
          } else {
            throw new Error('Login request failed');
          }
        } catch (error) {
          // Handle login error, display an error message, etc.
          console.log(error);
        }
      };

    return (
        <SafeAreaView style={{ backgroundColor: '#23282a', flex: 1 }}>
        <View style={styles.background}>
            <Text style={styles.title}>FeedMe</Text>
            <Text style={styles.subtitle}>Be in control of what you eat</Text>
        </View>
        <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Login</Text>
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
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpText}>Don't have an account? Sign up here</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    background: {
        backgroundColor: '#23282a',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 70,
    },
    loginContainer: {
        backgroundColor: '#23282a',
        borderRadius: 15,
        padding: 20,
        marginTop: -20,
        justifyContent: 'center',
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
    loginText: {
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
    loginButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#23282a',
        fontWeight: 'bold',
    },
    signUpText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    });

    export default LoginScreen;
