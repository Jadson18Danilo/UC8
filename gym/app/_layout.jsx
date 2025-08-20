import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { Ionicons } from "@expo/vector-icons";

// Importação das telas do aplicativo

import HomeScreen from "./(tabs)/HomeScreen";
import SettingsScreen from "./(tabs)/SettingsScreen";
import AddressScreen from "./(tabs)/AddressScreen";

//Importando tema claro e escuro

import { lightTheme, darkTheme } from "../styles/themes";

// Criação dos navegadores

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeStack ({theme}) {
    return(
        <Stack.Navigator>
            <Stack.Screen name="HomeMain"
            options={{headerShown: false}}
            component={(props) => <HomeScreen {...props} theme={theme} />}
            />
        </Stack.Navigator>
    )
}


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if ((route.name = "Settings")) iconName = "settings";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: theme.tabBar },
        tabBarActiveTintColor: "#4caf50",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: theme.tabBar },
        headerTintColor: theme.text,
      })}
    >
      <Tab.Screen name="Home">{() => <HomeStack theme={theme} />}</Tab.Screen>

      <Tab.Screen name="Settings">
        {() => (
          <SettingsScreen
            theme={theme}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
