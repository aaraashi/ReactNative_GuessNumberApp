import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Dimensions } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import StartButton from '../components/StartButton';

const GameOverScreen = props => {

    // const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    // const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
 
    // useEffect(() => {
    //     const updateLayout = () => {
    //         setDeviceWidth(Dimensions.get('window').width);
    //         setDeviceHeight(Dimensions.get('window').height);
    // };
 
    // Dimensions.addEventListener('change', updateLayout);
 
    // return () => {
    //         Dimensions.removeEventListener('change', updateLayout);
    //     };
    // });
 
    return (
        <ScrollView>
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
            <Image 
            //fadeDuration={1000}
            //source={require('../assets/success.png')}
            source={{uri: 'https://images.unsplash.com/photo-1569251200481-5df7232856ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}}
            style={styles.image} 
            resizeMod='cover'/>
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
                Your phone needed{' '} 
                <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to 
                guess the number{' '} 
                <Text style={styles.highlight}>{props.userNumber}</Text>. 
            </BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <StartButton onPress={props.onRestart}>
                NEW GAME</StartButton>
        </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: (Dimensions.get('window').width * 0.6) / 2, // half of width and height will make round shape
        borderWidth: 3,
        borderColor: 'blue',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
      },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;