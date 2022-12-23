import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput
} from "react-native";
import Checkbox from "expo-checkbox";
import { useHttpClient } from "../hooks/useHttpClient";
import Loader from "./Loader";
import baseUrl from "../baseUrl";

export default function CreateChat({
  navigation,
  joinChatVisible,
  setJoinChatVisible,
  socket,
  name
}) {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState(null);
  const [nameError, setNameError] = useState(null);
  const createHandler = async () => {
    if (!socket) return;
    let valid = true;
    if (!roomName) {
      setNameError("Enter Room ID");
      valid = false;
    }
    if (valid) {
      try {
        const data = await sendRequest(
          `${baseUrl}/api/room/joinRoom`,
          "POST",
          JSON.stringify({
            id: roomName,
            password: password
          }),
          {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        );
        if (!error) {
          const roomId = data.data.id;
          const roomName = data.data.name;
          clear();
          socket.emit("join-room", { roomId: roomId, name: name });
          navigation.navigate("Chat", { roomId: roomId, roomName: roomName });
        }
      } catch (err) {}
    }
  };
  const clear = () => {
    setRoomName("");
    setPassword("");
    setNameError(null);
    setJoinChatVisible(!joinChatVisible);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={joinChatVisible}
      onRequestClose={() => {
        clear();
      }}
    >
      <View style={styles.centeredView}>
        <Loader visible={isLoading} />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Join Room</Text>

          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Room ID"
              onChangeText={text => {
                setRoomName(text);
              }}
            />
            {nameError &&
              <Text style={styles.error}>
                {nameError}
              </Text>}
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={clear}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={createHandler}>
              <Text style={styles.textStyle}>Join</Text>
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
