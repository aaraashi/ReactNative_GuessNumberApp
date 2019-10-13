import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { ScreenOrientation } from 'expo';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import StartButton from '../components/StartButton';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width);
    const [deviceHeight, setDeviceHeight] = useState(
        Dimensions.get('window').height);    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

        // Pull out props so that props.userChoice can be userChoice
        const { userChoice, onGameOver } = props;

        useEffect(() => {
            const updateLayout = () => {
                setDeviceWidth(Dimensions.get('window').width);
                setDeviceHeight(Dimensions.get('window').height);
            };

            Dimensions.addEventListener('change', updateLayout);
            return () => {
                Dimensions.removeEventListener('change', updateLayout);
            };
        });

        useEffect(() => {
            if (currentGuess === userChoice) {
                onGameOver(pastGuesses.length);
            }
        }, [currentGuess, userChoice, onGameOver]); // state all dependencies 

        const nextGuessHandler = direction => {
            if ((direction === 'lower' && currentGuess < props.userChoice)
                || (direction === 'greater' && currentGuess > props.userChoice)) {
                    Alert.alert('Don\'t lie!', 'You know that this is wrong...', 
                    [{text:'Sorry', style: 'cancel'}]);
                return;
            }
            if (direction === 'lower'){
                currentHigh.current = currentGuess;
            } else {
                currentLow.current = currentGuess + 1;
            }
            const nextNumber = generateRandomBetween(
                currentLow.current, 
                currentHigh.current, 
                currentGuess
                );
            setCurrentGuess(nextNumber);
            //setRounds(curRounds => curRounds + 1);
            setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
        };

        let listContainerStyle = styles.listContainer;

        if (deviceWidth < 350) {
            listContainerStyle = styles.listContainerBig;
        }

        if (deviceHeight < 500) {
            return (
              <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                  <StartButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                  </StartButton>
                  <NumberContainer>{currentGuess}</NumberContainer>
                  <StartButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                  </StartButton>
                </View>
                <View style={listContainerStyle}>
                  {/* <ScrollView contentContainerStyle={styles.list}>
                  {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                  <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                  />
                </View>
              </View>
            );
          }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <StartButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="ios-arrow-dropdown" size={24} color="white"/>
                    </StartButton>
                    <StartButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="ios-arrow-dropup" size={24} color="white"/>
                    </StartButton>
                </Card>
                <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle=
                {styles.list}>
                    {pastGuesses.map((guess, index) => 
                    renderListItem(guess, pastGuesses.length - index)                
                    )}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} 
                data={pastGuesses} 
                renderItem={renderListItem.bind(this, pastGuesses.length)} 
                contentContainerStyle=
                {styles.list}/>
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10, 
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;