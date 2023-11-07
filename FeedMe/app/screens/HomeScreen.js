import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavigationBar from '../components/NavigationBar';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen() {
  const [currentCalories, setCurrentCalories] = useState(0);
  const [foodNames, setFoodNames] = useState([]);

  useEffect(() => {
    fetchDailyIntake();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDailyIntake();
    }, [])
  );

  const fetchDailyIntake = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://localhost:3000/dailyIntake', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCurrentCalories(data.calories);
        setFoodNames(data.foodNames);
      } else {
        throw new Error('Failed to fetch daily intake');
      }
    } catch (error) {
      console.error('Error fetching daily intake:', error);
      // Handle the error accordingly
    }
  };

  const renderFoodItems = () => {
    return foodNames.map((item, index) => (
      <View style={styles.rowContainer} key={index}>
        <Text style={textStyles.text}>{item}</Text>
      </View>
    ));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.columnContainer}>
            <View style={styles.largeHeaderContainer}>
              <Text style={textStyles.subHeader}>Calories</Text>
              <View style={styles.rowContainer}>
                <Text style={textStyles.subHeader}>{currentCalories} Calories</Text>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={textStyles.subHeader}>What's been eaten today</Text>
              {renderFoodItems()}
            </View>
          </View>
        </ScrollView>

        <StatusBar style="auto" />
      </SafeAreaView>
      <NavigationBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23282a',
    alignItems: 'center',
  },
  columnContainer: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width * .94,
    backgroundColor: '#31373a',
    marginTop: 10,
    padding: 8,
  },
  largeHeaderContainer: {
    width: Dimensions.get('window').width * 0.94,
    height: 200,
    backgroundColor: '#31373a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  listContainer: {
    width: Dimensions.get('window').width * 0.94,
    height: 200,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  smallHeaderContainer: {
    width: Dimensions.get('window').width * 0.46,
    height: 200,
    backgroundColor: '#31373a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  progressLabel: {
    fontSize: 16,
    color: '#f2f2f2',
  },
});

const textStyles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'seagreen',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default HomeScreen;

/*
<View style={styles.largeHeaderContainer}>
              <Text style={textStyles.subHeader}>Weight</Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.smallHeaderContainer}>
                <Text style={textStyles.subHeader}>Calories Burnt</Text>
              </View>
              <View style={styles.smallHeaderContainer}>
                <Text style={textStyles.subHeader}>Steps Taken</Text>
              </View>
            </View>
*/