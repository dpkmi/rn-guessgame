import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

interface PrimaryButtonProps {
  children: React.ReactNode;
  version?: "primary" | "secondary";
  onPress: () => void;
  disabled?: boolean;
}

function PrimaryButton({
  children,
  onPress,
  version,
  disabled = false,
}: PrimaryButtonProps) {
  const isSecondary = version === "secondary";

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          styles.pressed,
          isSecondary ? styles.secondaryBtn : styles.primaryBtn,
          disabled && styles.disabledBtn,
          pressed && !disabled && styles.pressed,
        ]}
        onPress={onPress}
        android_ripple={{ color: "#640233" }}
        disabled={disabled}
      >
        <Text
          style={[
            styles.buttonText,
            isSecondary ? styles.buttonTextSecondary : styles.buttonTextPrimary,
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    width: 120,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextPrimary: {
    color: Colors.gray700,
  },
  buttonTextSecondary: {
    color: Colors.white,
  },
  primaryBtn: {
    backgroundColor: Colors.btnPrimary,
    color: Colors.gray700,
  },
  secondaryBtn: {
    backgroundColor: Colors.primary700,
    color: Colors.white,
  },
  disabledBtn: {
    backgroundColor: Colors.gray700,
  },
});
