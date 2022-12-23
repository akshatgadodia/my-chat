import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { Button } from "@rneui/themed";
import CreateChat from "../Components/CreateChat";
import React, { useState } from "react";
import JoinChat from "./../Components/JoinChat";
export default function HomeScreen({ navigation, socket, name, email }) {
  const [createChatVisible, setCreateChatVisible] = useState(false);
  const [joinChatVisible, setJoinChatVisible] = useState(false);
  const createRoomHandler = () => {
    setCreateChatVisible(true);
  };
  const joinRoomHandler = () => {
    setJoinChatVisible(true);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CreateChat
          createChatVisible={createChatVisible}
          setCreateChatVisible={setCreateChatVisible}
        />
        <JoinChat
          joinChatVisible={joinChatVisible}
          setJoinChatVisible={setJoinChatVisible}
          navigation={navigation}
          socket={socket}
          name={name}
        />
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/home_screen_background.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Welcome to My Chat</Text>
          <Text style={styles.taglineText}>Chat Any Time, Any Place</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="CREATE ROOM"
            onPress={createRoomHandler}
            titleStyle={{ fontWeight: "bold" }}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
          />
          <Button
            title="JOIN ROOM"
            titleStyle={{ fontWeight: "bold" }}
            onPress={joinRoomHandler}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
          />
        </View>
      </View>
    </SafeAreaProvider>
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
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 40,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  taglineText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "normal"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: undefined,
    paddingHorizontal: 10
  },
  buttonStyle: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10
  },
  buttonContainerStyle: {
    width: "50%",
    marginVertical: 10,
    padding: 5
  }
});
