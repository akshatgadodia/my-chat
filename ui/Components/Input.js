import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

export default function Input({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : isFocused ? "#7975b5" : "#f3f4fb" }
        ]}
      >
        <Icon type="font-awesome" name={iconName} style={styles.icon} />
        <TextInput
          {...props}
          style={styles.input}
          autoCorrect={false}
          secureTextEntry={hidePassword}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {password &&
          <Icon
            type="font-awesome"
            style={styles.passwordIcon}
            name={hidePassword ? "eye" : "eye-slash"}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          />}
      </View>
      {error &&
        <Text style={styles.error}>
          {error}
        </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "#babbc3"
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#f3f4fb",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center"
  },
  icon: {
    fontSize: 22,
    color: "#7978b5",
    marginRight: 10
  },
  input: {
    color: "#7978b5",
    flex: 1
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 7
  },
  passwordIcon: {
    fontSize: 22,
    color: "#7978b5"
  }
});
