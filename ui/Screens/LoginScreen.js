import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Keyboard
} from "react-native";
import { Button } from "@rneui/themed";
import Input from "../Components/Input";
import React, { useState } from "react";
import Loader from "../Components/Loader";
import { useHttpClient } from "../hooks/useHttpClient";
import baseUrl from "../baseUrl.js";
export default function LoginScreen({
  navigation,
  setLoggedIn,
  setName,
  setPhonenumber,
  setEmail
}) {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length should be 5", "password");
      isValid = false;
    }
    if (isValid) {
      loginHandler();
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const loginHandler = async () => {
    try {
      const data = await sendRequest(
        `${baseUrl}/api/user/signin`,
        "POST",
        JSON.stringify(inputs),
        {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      );
      if (!error) {
        setLoggedIn(true);
        setName(data.data.fullname);
        setPhonenumber(data.data.phonenumber);
        setEmail(data.data.email);
      }
    } catch (err) {}
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/login_screen_background.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.taglineText}>Enter Your Details to Login</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Input
            label="Email"
            iconName="envelope"
            placeholder="Enter your email address"
            onChangeText={text => handleOnchange(text, "email")}
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
          />
          <Input
            label="Password"
            iconName="lock"
            placeholder="Enter your password"
            password
            onChangeText={text => handleOnchange(text, "password")}
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
          />
          <Button
            title="LOGIN"
            titleStyle={{ fontWeight: "bold" }}
            onPress={validate}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
          />
          <Text
            style={styles.linkOther}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Don't have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    width: "100%",
    height: undefined
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: undefined,
    resizeMode: "contain"
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 30,
    textAlign: "left",
    marginHorizontal: 10,
    fontWeight: "bold"
  },
  taglineText: {
    fontSize: 15,
    textAlign: "left",
    marginHorizontal: 10,
    fontWeight: "normal"
  },
  buttonContainer: {
    width: "100%",
    height: undefined,
    paddingHorizontal: 20,
    marginTop: 20
  },
  buttonStyle: {
    backgroundColor: "#5d5fee",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10
  },
  buttonContainerStyle: {
    width: "100%",
    padding: 5
  },
  linkOther: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40
  }
});
