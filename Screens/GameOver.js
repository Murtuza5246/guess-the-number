import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

//components
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

//theme
import color from "../constant/color";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over</TitleText>
      <View style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={require("../assets/success.png")}
          // source={{
          //   uri:
          //     "https://my-server-problemspotter.herokuapp.com/websiteLogo/newlogo.jpg",
          // }}
        />
      </View>
      <Text>
        Total Rounds : <Text style={styles.NumberStyle}>{props.rounds}</Text>
      </Text>
      <Text>Number was</Text>
      <NumberContainer>{props.number}</NumberContainer>

      <MainButton style={styles.gameOverButton} onPress={props.newGameStart}>
        START NEW GAME
      </MainButton>
    </View>
  );
};
export default GameOver;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  restartsButtonHandle: {
    padding: 10,
  },
  ImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",
    marginVertical: 30,

    overflow: "hidden",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  NumberStyle: {
    color: color.primary,
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  gameOverButton: {
    backgroundColor: color.accent,
  },
});
