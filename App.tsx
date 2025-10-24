import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

// screens
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [show, setShow] = useState(true);
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(true);
  const [rounds, setRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };

  function newGameHandler() {
    setUserNumber(null);
    setRounds(0);
    setGameOver(true);
  }

  function gameOverHandler(totalRounds: number) {
    setRounds(totalRounds);
    setGameOver(true);
  }

  let screen = (
    <StartGameScreen
      visible={show}
      min={1}
      max={99}
      onClose={() => setShow(false)}
      onConfirm={pickedNumberHandler}
    />
  );

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={rounds}
        userNumber={userNumber!}
        onStartNewGame={newGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#4c9f9cff", "#3b9882ff", "#195d5aff"]}
      style={styles.container}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        style={styles.imgBackground}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  imageStyle: {
    opacity: 0.15,
  },
});
