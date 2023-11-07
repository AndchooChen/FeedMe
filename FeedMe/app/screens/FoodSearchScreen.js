import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, Dimensions, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';

const FoodSearchScreen = ({ route }) => {
  const buttonHandler = (foodInput) => {
    navigation.navigate("FoodInfo", { food: foodInput });
  };

  const navigation = useNavigation();
  const foodItem = route["params"].food;

  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/food-search', { foodItem });
        const data = response.data;
        setFoodData(data.hints);
        //console.log(data.hints);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

    return (
        <>
        <SafeAreaView style={styles.container}>
          <SearchBar />
            <FlatList
            data={foodData}
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => buttonHandler(item)}
              >
                <View style={styles.rowContainer}>
                  <Text style={styles.text}>{item['food'].label}</Text>
                  <Image
                    style={{ width: 80, height: 80, flex: 1}}
                    source = {{ uri: item['food'].image }}
                  />
                </View>
              </TouchableOpacity>
            )}
            />
        </SafeAreaView><NavigationBar /></>
    );
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#23282a',
      alignItems: 'center',
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
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: '#f2f2f2',
      flex: 3,
    },
}

export default FoodSearchScreen;