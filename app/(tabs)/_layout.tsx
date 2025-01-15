import { Colors } from "@/app-example/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarInactiveTintColor: "blue",
      tabBarActiveTintColor: "red",
    }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="/orc" />
    </Tabs>
  )
}
