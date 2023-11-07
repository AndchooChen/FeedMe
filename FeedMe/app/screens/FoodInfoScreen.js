import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, TextInput, Dimensions, View, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NavigationBar from '../components/NavigationBar';
import NutritionFactsLabel from '../components/NutritionFactsLabel';
import FoodVerifier from '../components/FoodVerifier';

const FoodInfoScreen = ({ route }) => {
  const foodItem = route.params.food;
  const [weightType, setWeightType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weights, setWeights] = useState(null); // Initialize with null
  const [calories, setCalories] = useState(''); // Initialize with null

  // Fetch and set weights data on component mount
  useEffect(() => {
    const fetchWeightsData = () => {
      const newWeights = {};
      for (let i = 0; i < foodItem.measures.length; i++) {
        const measure = foodItem.measures[i];
        const { label, uri } = measure;
        newWeights[label] = uri;
      }
      setWeights(newWeights);
    };
  
    fetchWeightsData();
  }, [foodItem.measures]);
  

  const submitHandler = () => {
    
  };

  const handleNutritionFacts = (nutritionData) => {
    setCalories(nutritionData.calories);
  };
  

  if (!weights) {
    return <Text>Loading weights...</Text>;
  }

  const showNutritionFacts = weightType !== '' && quantity !== '';

  return (
    <>
      <SafeAreaView style={styles.container}>
      <FoodVerifier isComplete={showNutritionFacts} calories={calories} food={foodItem} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Food Information</Text>
          <Text style={styles.foodLabel}>The food is: {foodItem.food.label}</Text>
          <Image style={styles.foodImage} source={{ uri: foodItem.food.image }} />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight Type:</Text>
            <Picker
              style={styles.dropdown}
              selectedValue={weightType}
              onValueChange={(itemValue) => setWeightType(itemValue)}
              itemStyle={styles.pickerItem} // Apply custom styles to picker items
            >
              <Picker.Item label="Select Weight" value="" />
              {Object.entries(weights).map(([label, weight]) => (
                <Picker.Item key={label} label={label} value={label} />
              ))}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Quantity"
              placeholderTextColor="#f2f2f2"
              onChangeText={setQuantity}
              value={quantity}
              onSubmitEditing={submitHandler}
              keyboardType="numeric"
            />
          </View>

          {showNutritionFacts && (
            <View style={styles.nutritionFactsContainer}>
              <Text style={styles.title}>Nutrition Facts</Text>
              <NutritionFactsLabel
                foodItem={foodItem}
                weightType={weights[weightType]} // Pass the measureURI specific to the weightType
                quantity={quantity}
                onNutritionFacts={handleNutritionFacts} // Pass the callback function
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <NavigationBar/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23282a',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  foodLabel: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  foodImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    padding: 20,
    width: Dimensions.get('window').width * 0.75,
    backgroundColor: '#31373a',
    color: '#ffffff',
  },
  pickerItem: {
    color: '#ffffff',
  },
  input: {
    height: 40,
    width: Dimensions.get('window').width * 0.75,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#31373a',
    borderColor: '#4d555b',
    color: '#f2f2f2',
  },
  nutritionFactsContainer: {
    marginVertical: 20,
  },
});

export default FoodInfoScreen;
