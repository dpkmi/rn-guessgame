import { StyleSheet, View, Text, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Header from "../components/ui/Header";
import NumberContainer from "../components/game/NumberContainer";
import OpponentsGuess from "../components/OpponentsGuess";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";

const generateRandomBetween = (min: number, max: number, exclude: number) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

interface GameScreenProps {
  userNumber: number;
  onGameOver: (totalRounds: number) => void;
}

const GameScreen = ({ userNumber, onGameOver }: GameScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  // state for current guess and guess history
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessHistory, setGuessHistory] = useState<number[]>([]);

  useEffect(() => {
    // gameover conditions
    if (currentGuess === userNumber) {
      onGameOver(guessHistory.length + 1);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // handler for next guess
  function nextGuessHandler(direction: "lower" | "greater") {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      alert("Don't lie! You know that this is wrong...");
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessHistory((prevGuesses) => [newRndNumber, ...prevGuesses]);
  }

  return (
    <View style={styles.container}>
      <Header>Opponent's Guess</Header>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.guessContainer}>
        <Text style={styles.hintText}>Higher or Lower?</Text>
        <View style={styles.btnContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <AntDesign name="plus" size={24} color="black" />
          </PrimaryButton>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, "lower")}
            version="primary"
          >
            <AntDesign name="minus" size={24} color="black" />
          </PrimaryButton>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* map over guesses */}
        {guessHistory.map((guess, index) => (
          <OpponentsGuess key={index} guessNumber={guess} round={index + 1} />
        ))}
      </ScrollView>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 320,
  },
  hintText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
  guessContainer: {
    backgroundColor: Colors.primary700,
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    gap: 15,
    alignItems: "center",
  },
});
