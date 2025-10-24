import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 320,
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.gray700,
  },
});
