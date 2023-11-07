import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FoodVerifier = ({ isComplete, calories, food }) => {
  const navigation = useNavigation();

  const handleVerify = async () => {
    try {
      // Prepare the data to send to the server
      const data = {
        calories: calories,
        foodName: food.food.label,
      };
  
      // Get the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
  
      // Send a POST request to the server with the JWT token in the headers
      const response = await fetch('http://localhost:3000/dailyIntake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Daily intake saved');
  
        navigation.navigate('Home'); // Pass the updatedFoodItems as a parameter
      } else {
        throw new Error('Failed to save daily intake');
      }
    } catch (error) {
      console.error('Error saving daily intake:', error);
      // Handle the error accordingly
    }
  };
  
  const renderIcon = () => {
    if (isComplete) {
      return (
        <TouchableOpacity onPress={handleVerify}>
          <Icon name="check-circle" size={24} color="seagreen" />
        </TouchableOpacity>
      );
    } else {
      return <Icon name="circle" size={24} color="#cccccc" />;
    }
  };

  return <View style={styles.foodVerifierContainer}>{renderIcon()}</View>;
};

const styles = StyleSheet.create({
  foodVerifierContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -20,
    marginTop: 5,
  },
});

export default FoodVerifier;
