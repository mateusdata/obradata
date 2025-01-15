import { IconSymbol } from "@/app-example/components/ui/IconSymbol.ios";
import { Colors } from "@/app-example/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarInactiveTintColor: "#A9A9A9",
      tabBarActiveTintColor: "black",
      headerTransparent: true,
      freezeOnBlur: true,
      popToTopOnBlur: true
    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen name="orc"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="file-pdf-o" color={color} />,
        }}
      />

      <Tabs.Screen name="data"
        options={{
          title: 'Orçamento',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  )
}
