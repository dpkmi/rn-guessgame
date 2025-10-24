import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Header from "../components/ui/Header";

type InputNumberProps = {
  visible: boolean;
  min?: number;
  max?: number;
  title?: string;
  onConfirm: (value: number) => void;
  onClose: () => void;
};

const StartGameScreen = ({
  visible,
  min,
  max,
  title,
  onConfirm,
}: InputNumberProps) => {
  // entered number
  const [inputValue, setInputValue] = useState("");

  // only numbers
  const numberInputHandler = (t: string) =>
    setInputValue(t.replace(/[^\d]/g, ""));

  // parse to number or NaN
  const n = inputValue === "" ? NaN : Number(inputValue);

  // validation
  if (min === undefined) min = 1;
  if (max === undefined) max = 99;
  if (title === undefined) title = "Enter a number";

  const error =
    inputValue === ""
      ? "Please enter a number"
      : Number.isNaN(n)
      ? "Invalid number"
      : n < min || n > max
      ? `Number must be between ${min} and ${max}`
      : "";

  const disabled = Boolean(error);

  const confirmInputHandler = () => {
    if (!disabled && !Number.isNaN(n)) {
      onConfirm(n);
      setInputValue("");
    }
  };

  const resetInputHandler = () => {
    setInputValue("");
  };

  if (!visible) return null;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <Header>Guess My Number</Header>
        <Text style={styles.label}>{title || "Enter a number"}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={numberInputHandler}
            value={inputValue}
            inputMode="numeric"
            maxLength={String(max).length}
            onSubmitEditing={confirmInputHandler}
          />

          {error ? (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          ) : null}

          <View style={styles.btnContainer}>
            <PrimaryButton
              onPress={confirmInputHandler}
              version="primary"
              disabled={disabled}
            >
              Play
            </PrimaryButton>
            <PrimaryButton onPress={resetInputHandler} version="secondary">
              Reset
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 320,
  },
  container: {
    width: 320,
    paddingHorizontal: 24,
    gap: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
  },
  input: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary500,
    borderBottomWidth: 2,
    width: "100%",
    maxWidth: 120,
    textAlign: "center",
    padding: 10,
    borderColor: Colors.gray700,
  },
  btnContainer: {
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
