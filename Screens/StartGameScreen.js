import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";

//Components
import Card from "./Card";
import Input from "../components/Input";

//theme
import color from "../constant/color";
import NumberContainer from "../components/NumberContainer";

export default StartGameScreen = () => {
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
        <Text>You Selected</Text>
        <NumberContainer>{chosenNumber}</NumberContainer>
        <Button title="START GAME" />
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
        <Text style={styles.title}>The Game Screen Is Here</Text>

        <Card style={styles.InputContainer}>
          <Text>Select The Number</Text>
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
    fontSize: 20,
    marginVertical: 10,
  },
  InputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
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
