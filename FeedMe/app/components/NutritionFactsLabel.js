import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NutritionFactsLabel = ({ foodItem, weightType, quantity, onNutritionFacts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const requestData = {
        foodItem,
        weightType,
        quantity,
      };

      try {
        const response = await fetch('http://localhost:3000/api/nutrition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        const data = await response.json();
        setFoodData(data);
        setIsLoading(false);

        onNutritionFacts(data);
      } 
      catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchNutritionData();
  }, [foodItem, weightType, quantity]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!foodData) {
    return null;
  }

  // Extract the necessary data from foodData
  const { calories, totalWeight, totalNutrients } = foodData;

  return (
    <View style={styles.nutritionFactsContainer}>
      <Text style={styles.title}>Nutrition Facts</Text>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Calories:</Text>
          <Text style={styles.value}>{foodData.calories}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subLabel}>Amount Per Serving</Text>
        </View>
        {Object.keys(foodData.totalDaily).map((nutrient) => (
          <View style={styles.row} key={nutrient}>
            <Text style={styles.label}>{foodData.totalDaily[nutrient].label}:</Text>
            <Text style={styles.value}>
              {foodData.totalDaily[nutrient].quantity.toFixed(1)} {foodData.totalDaily[nutrient].unit}
            </Text>
            
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nutritionFactsContainer: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    flex: 1,
    marginRight: 5,
    fontWeight: 'bold',
  },
  subLabel: {
    flex: 1,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
  dv: {
    fontWeight: 'bold',
  },
});

export default NutritionFactsLabel;
