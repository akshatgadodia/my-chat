import { StyleSheet, Text, View, TextInput } from "react-native";
import { Icon } from "@rneui/themed";
import React, { useState, useEffect, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function ChatScreen({ route, navigation, socket, name }) {
  const scrollViewRef = useRef();
  const { roomId, roomName } = route.params;
  const [isFocused, setIsFocused] = useState(false);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [typing, setTyping] = useState(false);
  useEffect(
    () => {
      if (!socket) return;
      socket.on("typing-started-from-server", data => {
        setTyping(data.name);
      });
      socket.on("typing-stopped-from-server", () => {
        setTyping(false);
      });
      socket.on("message-from-server", data => {
        if (data.message === lastMessage) return null;
        setLastMessage(data.message);
        if (data.name) {
          setChats(prevChats => [
            ...prevChats,
            { type: "Received", message: data.message, sender: data.name }
          ]);
        }
      });
    },
    [socket]
  );

  const sendText = async () => {
    if (message === "") return;
    socket.emit("send-message", { message, roomId, name });
    setChats(prevChats => [...prevChats, { type: "Sent", message }]);
    setMessage("");
  };

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleTextChange = text => {
    setMessage(text);
    socket.emit("typing-started", { roomId, name });

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped", { roomId, name });
      }, 1000)
    );
  };

  return (
    <View style={styles.container}>
      <Text>
        Room ID: {roomId}
      </Text>
      <View style={styles.messagingContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {chats.map((data, idx) => {
            if (data.type === "Received") {
              return (
                <View>
                  <Text style={styles.sender} key={`name ${idx}`}>
                    {data.sender}
                  </Text>
                  <Text key={`received ${idx}`} style={styles.received}>
                    {data.message}
                  </Text>
                </View>
              );
            }
            return (
              <Text
                key={`sent ${idx}`}
                style={data.type === "Sent" ? styles.sent : styles.information}
              >
                {data.message}
              </Text>
            );
          })}
        </ScrollView>
        {typing &&
          <Text style={styles.typing}>
            {typing} typing...
          </Text>}
      </View>
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? "#7975b5" : "#f3f4fb" }
        ]}
      >
        <TextInput
          placeholder="Write your message..."
          style={styles.input}
          autoCorrect={false}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={text => {
            handleTextChange(text);
          }}
          value={message}
        />
        <Icon
          type="font-awesome"
          name="paper-plane"
          style={styles.icon}
          onPress={sendText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  messagingContainer: {
    flex: 1,
    width: "100%",
    padding: 10
  },
  inputContainer: {
    height: 55,
    backgroundColor: "#f3f4fb",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center"
  },
  input: {
    color: "#7978b5",
    flex: 1
  },
  icon: {
    fontSize: 22,
    color: "#7978b5",
    marginRight: 10
  },
  sent: {
    width: "100%",
    textAlign: "right",
    fontSize:14,
  },
  received: {
    width: "100%",
    textAlign: "left",
    fontSize:14,
  },
  sender: {
    width: "100%",
    textAlign: "left",
    color: "blue",
    fontWeight: "bold",
    fontSize: 16
  },
  typing: {
    width: "100%",
    textAlign: "center",
    color: "green",
    fontStyle: "italic",
    fontSize: 16
  }
});
