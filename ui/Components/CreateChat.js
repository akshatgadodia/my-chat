import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Alert
} from "react-native";
import Checkbox from "expo-checkbox";
import { useHttpClient } from "../hooks/useHttpClient";
import Loader from "./Loader";
import baseUrl from "../baseUrl";

export default function CreateChat({
  navigation,
  createChatVisible,
  setCreateChatVisible
}) {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [isSelected, setSelection] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const createHandler = async () => {
    let valid = true;
    if (!roomName) {
      setNameError("Enter Room Name");
      valid = false;
    }
    if (isSelected && !password) {
      setPasswordError("Enter Password");
      valid = false;
    }
    if (valid) {
      try {
        var roomId = Math.floor(Math.random() * 90000) + 10000;
        const data = await sendRequest(
          `${baseUrl}/api/room/`,
          "POST",
          JSON.stringify({
            id: roomId,
            name: roomName,
            type: isSelected,
            password: password
          }),
          {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        );
        if (!error) {
          Alert.alert("Room Created Successfully", `Room Id is ${roomId}`, [
            { text: "OK", onPress: () => clear() }
          ]);
        }
      } catch (err) {}
    }
  };
  const clear = () => {
    setRoomName("");
    setPassword("");
    setNameError(null);
    setPasswordError(null);
    setSelection(false);
    setCreateChatVisible(!createChatVisible);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={createChatVisible}
      onRequestClose={() => {
        clear();
      }}
    >
      <View style={styles.centeredView}>
        <Loader visible={isLoading} />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create Room</Text>

          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write Room Name"
              onChangeText={text => {
                setRoomName(text);
              }}
            />
            {nameError &&
              <Text style={styles.error}>
                {nameError}
              </Text>}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Private Room</Text>
            </View>
            {isSelected &&
              <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                onChangeText={text => {
                  setPassword(text);
                }}
                secureTextEntry
              />}
            {isSelected &&
              passwordError &&
              <Text style={styles.error}>
                {passwordError}
              </Text>}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={clear}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={createHandler}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputsContainer: {
    margin: 0,
    borderColor: "red",
    width: "100%"
  },
  textInput: {
    width: "100%",
    height: 40,
    borderBottomWidth: 0.5,
    textAlign: "left",
    borderColor: "black"
  },
  checkboxContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    width: "50%",
    marginHorizontal: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 7
  }
});
