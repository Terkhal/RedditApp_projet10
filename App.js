import "react-native-gesture-handler";

import * as React from "react";
import { Button, View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, IconButton } from "react-native-paper";

import ProfileScreen from "./components/ProfileScreen";
import MySubredditList from "./components/MySubredditList";
import PostList from "./components/Postlist";
import UnitPost from "./components/UnitPost";
import HomePage from "./components/HomePage";
import Filters from './components/Filters';

function RealDittersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ditters"
        component={HomeScreen}
        options={{ headerShown: false, drawerBarLabel: "prout" }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Postlist"
        component={PostList}
        options={{ title: "My home" }}
      />
      <Stack.Screen
        name="Subreddit"
        component={PostList}
        options={{ title: "My home" }}
      />
      <Stack.Screen
        name="PostView"
        component={UnitPost}
        options={{ title: "PostView" }}
      />
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" useLegacyImplementation={true}>
        {/* Pass the separate component to Drawer.Screen */}
        <Drawer.Screen
          name="RealDitters"
          component={RealDittersStack}
          options={({ navigation }) => ({
            headerRight: () => (
              <>
                <IconButton
                  icon="account-circle"
                  size={28}
                  onPress={() => navigation.navigate("Profile")}
                />
              </>
            ),
          })}
        />
        <Drawer.Screen name="My Subreddits" component={MySubredditList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Filters /> */}
      <HomePage />
    </SafeAreaView>
  );
}
