import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";

interface CardProps {
  confirmInputHandler: () => void;
  resetInputHandler: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const Card = ({
  confirmInputHandler,
  resetInputHandler,
  disabled,
  children,
}: CardProps) => {
  return (
    <View style={styles.btnContainer}>
      <PrimaryButton
        onPress={confirmInputHandler}
        version="primary"
        disabled={disabled}
      >
        {children}
      </PrimaryButton>
      <PrimaryButton onPress={resetInputHandler} version="secondary">
        {children}
      </PrimaryButton>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
    width: "100%",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
