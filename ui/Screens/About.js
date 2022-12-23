import { StyleSheet, Text, View, Linking } from "react-native";
import { Avatar } from "@rneui/themed";

function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Developed By:</Text>
      <Avatar
        size={150}
        rounded
        source={require("../assets/images/akshat-dp.png")}
      />
      <Text style={styles.name}>Akshat Gadodia</Text>
      <Text style={styles.details}>Phone : +91-7737152961</Text>
      <Text style={styles.details}>Email : akshatgadodia@gmail.com</Text>
      <Text
        style={styles.links}
        onPress={() =>
          Linking.openURL("https://akshatgadodia.github.io/personalwebsite/")}
      >
        Personal Website
      </Text>
      <View style={styles.connectContainer}>
        <Text style={styles.heading}>Connect:</Text>
        <Text
          style={styles.links}
          onPress={() =>
            Linking.openURL("https://akshatgadodia.github.io/personalwebsite/")}
        >
          LinkedIn
        </Text>
        <Text
          style={styles.links}
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/akshat-gadodia/")}
        >
          GitHub
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5d5fee",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    color: "#fff"
  },
  connectContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  heading: {
    fontSize: 20,
    padding: 5,
    fontWeight: "bold",
    color: "#fff"
  },
  name: {
    fontSize: 25,
    padding: 5,
    fontWeight: "bold",
    color: "#fff"
  },
  details: {
    fontSize: 15,
    padding: 5,
    fontWeight: "bold",
    color: "#fff"
  },
  links: {
    fontSize: 15,
    padding: 5,
    fontWeight: "bold",
    color: "#fff",
    textDecorationLine: "underline"
  }
});

export default About;
