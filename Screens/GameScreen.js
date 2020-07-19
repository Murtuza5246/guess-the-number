import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../Screens/Card";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

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

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, SetCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess]);
  const [rounds, setRounds] = useState(0);

  const currantHigh = useRef(100);
  const currantLow = useRef(1);
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const buttonHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't cheat", "You know thats Wrong...", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currantHigh.current = currentGuess;
    } else {
      currantLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currantLow.current,
      currantHigh.current,
      currentGuess
    );
    SetCurrentGuess(nextNumber);
    setPastGuess((prevState) => [nextNumber, ...prevState]);
    setRounds((prev) => prev + 1);
  };

  const renderListItem = (value, index) => {
    return (
      <View key={value} style={styles.individualItemView}>
        <BodyText>#{index}</BodyText>
        <BodyText>{value}</BodyText>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <TitleText>Opponents Guess</TitleText>

      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <MainButton onPress={buttonHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} />
        </MainButton>
        <MainButton onPress={buttonHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} />
        </MainButton>
      </Card>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) =>
            renderListItem(guess, pastGuess.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  individualItem: {
    width: "80%",
  },
  scrollContainer: {
    flex: 1,
    width: "80%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  individualItemView: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    borderWidth: 3,
    borderColor: "#ccc",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    padding: 20,
    maxWidth: "80%",
  },
});
