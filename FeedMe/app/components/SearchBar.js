import React from 'react';
import { TextInput, Dimensions, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const [foodInput, setFoodInput] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate("FoodSearch", { food: foodInput })
    setFoodInput("");
  };

  return (
    <TextInput
      style={styles.input}
      placeholder="Search for a food"
      placeholderTextColor='#f2f2f2'
      onChangeText={value => setFoodInput(value)}
      value={foodInput}
      onSubmitEditing={handleSubmit}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: Dimensions.get('window').width * .94,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#31373a',
    borderColor: '#4d555b',
    color: '#f2f2f2',
  },
});

export default SearchBar;
