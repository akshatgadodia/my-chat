import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./Screens/MainScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import ChatScreen from "./Screens/ChatScreen";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { Icon } from "@rneui/themed";
import Profile from './Screens/Profile';
import About from './Screens/About';
import { StatusBar } from 'expo-status-bar';
const header = {
  headerTitleAlign: "center",
  headerStyle: {
    // backgroundColor: "#f4511e"
    backgroundColor:'#5d5fee'
  },
  headerTintColor: "#fff",
  headerTitleStyle: {},
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "black"
};

export default function App() {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://192.168.29.39:5000"));
  }, []);

  function Home() {
    return (
      <Stack.Navigator screenOptions={header}>
        <Stack.Screen name="Chats" options={{ title: "Chats" }}>
          {props => <HomeScreen {...props} socket={socket} name={name} email={email}/>}
        </Stack.Screen>
        <Stack.Screen
          name="Chat"
          options={({ route }) => ({ title: route.params.roomName })}
        >
          {props => <ChatScreen {...props} name={name} socket={socket} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
    <StatusBar style="light" />
      {!loggedIn
        ? <Stack.Navigator screenOptions={header}>
            <Stack.Screen name="Main" options={{ title: "My Chat" }}>
              {props => <MainScreen {...props} prop="props" />}
            </Stack.Screen>
            <Stack.Screen name="Login" options={{ title: "Login" }}>
              {props =>
                <LoginScreen
                  {...props}
                  setLoggedIn={setLoggedIn}
                  setName={setName}
                  setPhonenumber={setPhonenumber}
                  setEmail={setEmail}
                />}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{ title: "Register" }}>
              {props => <RegisterScreen {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        : <Tab.Navigator screenOptions={header}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: (tintColor) =>
                  <Icon type='font-awesome' color={tintColor} name="home" size={25} />
              }}
            />
            <Tab.Screen
              name="Profile"
              options={{
                tabBarIcon: (tintColor) =>
                  <Icon type='font-awesome' color={tintColor} name="user" size={25} />
              }}
            >
              {props =>
                <Profile
                  {...props}
                  setLoggedIn={setLoggedIn}
                  setName={setName}
                  setPhonenumber={setPhonenumber}
                  setEmail={setEmail}
                  name={name}
                  email={email}
                  phonenumber={phonenumber}

                />}
            </Tab.Screen>
            <Tab.Screen
              name="About"
              component={About}
              options={{
                tabBarIcon: (tintColor) =>
                  <Icon type='font-awesome' color={tintColor} name="info" size={25} />
              }}
            />
            {/* <Tab.Screen name="Profile" component={ChatScreen} /> */}
          </Tab.Navigator>}
    </NavigationContainer>
  );
}
