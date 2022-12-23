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
import baseUrl from "../baseUrl";

export default function RegisterScreen({ navigation }) {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phonenumber: "",
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

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }
    if (!inputs.phonenumber) {
      handleError("Please input phone number", "phonenumber");
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
      registerHandler();
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const registerHandler = async () => {
    try {
      const data = await sendRequest(
        `${baseUrl}/api/user/signup`,
        "POST",
        JSON.stringify(inputs),
        {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      );
      if (!error) {
        navigation.navigate("Login");
      }
    } catch (err) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/register_screen_background.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Register</Text>
          <Text style={styles.taglineText}>Enter Your Details to Register</Text>
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
            label="Full Name"
            iconName="user"
            placeholder="Enter your full name"
            onChangeText={text => handleOnchange(text, "fullname")}
            error={errors.fullname}
            onFocus={() => {
              handleError(null, "fullname");
            }}
          />
          <Input
            label="Phone Number"
            iconName="phone"
            placeholder="Enter your phone number"
            keyboardType="Numeric"
            onChangeText={text => handleOnchange(text, "phonenumber")}
            error={errors.phonenumber}
            onFocus={() => {
              handleError(null, "phonenumber");
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
            title="REGISTER"
            titleStyle={{ fontWeight: "bold" }}
            onPress={validate}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
          />
          <Text
            style={styles.linkOther}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Already have an account? Login
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
