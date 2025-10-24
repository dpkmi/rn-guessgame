import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface OpponentsGuessProps {
  guessNumber: number;
  round: number;
}

const OpponentsGuess = ({ guessNumber, round }: OpponentsGuessProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.amountGuess}>#{round}</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.title}>Opponent's Guess:</Text>
        <Text style={styles.number}>{guessNumber}</Text>
      </View>
    </View>
  );
};

export default OpponentsGuess;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    width: 320,
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  number: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#000",
  },
  amountGuess: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
