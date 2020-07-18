import React from "react";
import { View, Text, StyleSheet } from "react-native";

//theme
import color from "../constant/color";

const Header = (props) => {
  return (
    <View style={styles.Header}>
      <Text style={styles.HeaderText}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  HeaderText: {
    color: "black",
    fontSize: 25,
  },
});
