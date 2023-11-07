import React from 'react';
import { Text, View, StatusBar, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

const JournalScreen = () => {
    return (
        <><SafeAreaView style={styles.container}>
          <Text style={textStyles.header}>FeedMe</Text>
    
            <View style={styles.subContainer}>

              <SearchBar />
            </View>
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
        alignItems:'center',
      },
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
      largeHeaderContainer: {
        width: Dimensions.get('window').width * .94,
        height: 150,
        backgroundColor: '#31373a',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
      },
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

export default JournalScreen;

/*
<ScrollView>
                <View style={styles.largeHeaderContainer}>
                  <Text style={textStyles.subHeader}>Breakfast</Text>
                </View>
                <View style={styles.largeHeaderContainer}>
                  <Text style={textStyles.subHeader}>Lunch</Text>
                </View>
                <View style={styles.largeHeaderContainer}>
                  <Text style={textStyles.subHeader}>Dinner</Text>
                </View>
                <View style={styles.largeHeaderContainer}>
                  <Text style={textStyles.subHeader}>Snack</Text>
                </View>
              </ScrollView>
*/
