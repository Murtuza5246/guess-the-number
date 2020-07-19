import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import GameOver from "./Screens/GameOver";

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  const startGameHandler = (number) => {
    setUserNumber(number);
    setGuessRounds(0);
  };
  const gameOverHandler = (rounds) => {
    setGuessRounds(rounds);
  };
  const configureNewGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let container = <StartGameScreen startGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    container = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (userNumber && guessRounds > 0) {
    container = (
      <GameOver
        rounds={guessRounds}
        number={userNumber}
        newGameStart={configureNewGame}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title={"Guess The Number"} />
      {container}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
