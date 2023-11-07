import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function NavigationBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconContainer]}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="today-outline" size={24} color = "#f2f2f2" />
        <Text style={styles.iconLabel}>Today</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconContainer]}
        onPress={() => navigation.navigate("Journal")}
      >
        <Ionicons name="book-outline" size={24} color = "#f2f2f2" />
        <Text style={styles.iconLabel}>Journal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconContainer]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-outline" size={24} color = "#f2f2f2" />
        <Text style={styles.iconLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get('window').height * .08,
    width: Dimensions.get('window').width,
    backgroundColor: 'seagreen',
  },
  iconContainer: {
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
    color: '#f2f2f2',
  },
};

export default NavigationBar;
