import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.accent500,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 320,
  },
  title: {
    fontSize: 24,
    color: Colors.accent500,
    fontFamily: "open-sans-bold",
  },
});

export default Header;
