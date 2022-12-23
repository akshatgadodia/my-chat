import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar } from "@rneui/themed";
export default function Profile({
  navigation,
  setLoggedIn,
  setName,
  setPhonenumber,
  setEmail,
  name,
  email,
  phonenumber
}) {
  const logoutHandler = () => {
    setLoggedIn(false);
    setName("");
    setPhonenumber("");
    setEmail("");
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar
            size={100}
            rounded
            title={name.substring(0, 2)}
            containerStyle={{ backgroundColor: "#5d5fee" }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>
            {name}
          </Text>
          <Text style={styles.taglineText}>
            Email : {email}
          </Text>
          <Text style={styles.taglineText}>
            Phone Number : {phonenumber}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="LOGOUT"
            titleStyle={{ fontWeight: "bold" }}
            onPress={logoutHandler}
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
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "center"
  },
  image: {},
  textContainer: {
    flex: 2,
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
    flex: 1,
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
  }
});
