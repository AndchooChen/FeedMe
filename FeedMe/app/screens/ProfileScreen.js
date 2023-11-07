import React from 'react';
import { Text, View, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
  const navigation = useNavigation();

    return (
        <><SafeAreaView style={styles.container}>
          <Header />

            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={textStyles.subHeader}>Sign out</Text>
            </TouchableOpacity>

          <StatusBar style="auto" />
        </SafeAreaView>
        <NavigationBar /></>
      );
    }
    
    const styles = {
      container: {
        flex: 1,
        backgroundColor: '#23282a',
        alignItems: 'center',
      },
      subContainer: {
        marginTop: 10,
        width: Dimensions.get('window').width * .94,
        alignItems: 'center',
      },
      rowContainer: {
        marginTop: 10,
        width: Dimensions.get('window').width * .94,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      },
      columnContainer: {
        marginTop: 10,
        backgroundColor: '#23282a',
        alignItems: 'center',
      },
      button: {
        marginTop: 10,
        width: Dimensions.get('window').width * .94,
        alignItems: 'center',
        backgroundColor: '#31373a',
        padding: 10
      }
    };
    
    const textStyles = {
      header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "seagreen",
      },
      subHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#f2f2f2',
      }
    };

export default ProfileScreen;

/*
<View style={styles.subContainer}>
              <Text style={textStyles.subHeader}>Username: Andchoo</Text>
            </View>

           
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                <Text style={textStyles.subHeader}>Login Streak</Text>
                <Text style={textStyles.subHeader}>108 days</Text>
              </View>
              <View style={styles.columnContainer}>
                <Text style={textStyles.subHeader}>Progress</Text>
                <Text style={textStyles.subHeader}>4 lbs</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={textStyles.subHeader}>Profile Information</Text>
            </TouchableOpacity>
*/