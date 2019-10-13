import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, 
    Button, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, 
KeyboardAvoidingView, Dimensions } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import StartButton from '../components/StartButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, '')); // regular expression
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const confirmInputHandler = () => {
            // validate enteredValue
            const chosedNumber = parseInt(enteredValue);
            if (isNaN(chosedNumber) || chosedNumber <= 0 || chosedNumber > 99){
                Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]) // closing pop up
                return;
            }
        setConfirmed(true);
        setSelectedNumber(chosedNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = ( 
        <Card style={styles.confirmed}>
        <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <StartButton onPress={() => props.onStartGame(selectedNumber)}>
            START GAME
            </StartButton> 
        </Card>
        );
    }

    return (
        <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback 
            onPress={() => {
            Keyboard.dismiss(); // handle keyboard with tapping other area on the phone (User friendly)
        }}>
        <View style={styles.screen}>
            <TitleText>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input 
                style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={{width: buttonWidth}}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.reset}/></View>
                    <View style={{width: buttonWidth}}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.accent}/></View>
                </View>
            </Card>
            <View>
            {confirmedOutput}
            </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        //width: 100
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    confirmed: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;