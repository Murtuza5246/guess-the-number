import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";

//Components
import Card from "./Card";
import Input from "../components/Input";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

//theme
import color from "../constant/color";
import NumberContainer from "../components/NumberContainer";

export default StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [chosenNumber, setChosenNumber] = useState();

  const NumberHandler = (e) => {
    setEnteredNumber(e.replace(/[^0-9]/g, ""));
  };
  const resetHandler = () => {
    setEnteredNumber("");
    setConfirm(false);
  };
  const confirmNumber = () => {
    const selectedNumber = parseInt(enteredNumber);
    if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > 99) {
      Alert.alert("Invalid Number", "Enter Number between 1-99", [
        { title: "okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }

    setConfirm(true);
    setEnteredNumber("");
    setChosenNumber(selectedNumber);
    Keyboard.dismiss();
  };

  let confirmedText;
  if (confirm) {
    confirmedText = (
      <Card style={styles.confirmText}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{chosenNumber}</NumberContainer>
        <MainButton onPress={() => props.startGame(chosenNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start new game</TitleText>

        <Card style={styles.InputContainer}>
          <BodyText style={styles.selectNumber}>Select The Number</BodyText>
          <Input
            keyboardType="number-pad"
            maxLength={2}
            autoCorrect={false}
            style={styles.input}
            onChangeText={NumberHandler}
            value={enteredNumber}
          />
          <View style={styles.ButtonContainer}>
            <View style={styles.buttonStyleController}>
              <Button
                onPress={resetHandler}
                color={color.accent}
                title="RESET"
              />
            </View>
            <View style={styles.buttonStyleController}>
              <Button
                color={color.primary}
                title="CONFIRM"
                onPress={confirmNumber}
              />
            </View>
          </View>
        </Card>
        {confirmedText}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
  },
  InputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  selectNumber: {
    marginVertical: 10,
  },
  ButtonContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  buttonStyleController: {
    width: "45%",
  },
  input: {
    width: 60,
    textAlign: "center",
  },
  confirmText: {
    width: "80%",
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
