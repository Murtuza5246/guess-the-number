import React from "react";
import { View, Text, StyleSheet } from "react-native";

//theme
import colors from "../constant/color";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};
export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.accent,
  },
  number: {
    fontSize: 30,
    color: colors.primary,
  },
});
