import React from 'react';
import { Text, View, SafeViewArea } from 'react-native';

function Header() {
    return (
        <View style = {styles.header}>
            <Text style = {styles.textHeader}>FeedMe</Text>
        </View>
    );
}

const styles = {
    header: {
        backgroundColor: '#23282a',
        alignItems: 'center',
    },
    textHeader: {
        color: 'seagreen',
        fontSize: 30,
        fontWeight: 'bold',
    },
};

export default Header;