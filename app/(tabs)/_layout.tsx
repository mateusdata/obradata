
import { Tabs, Redirect } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from "@/contexts/AuthProvider";
import { colorPrimary } from "@/constants/Colors";
import LoadingAuth from "@/components/LoadingAuth";
import CustomBottomNavigation from "@/components/CustomBottomNavigation";
export default function RootLayout() {

  const { user, isLoading } = useAuth()


  if (isLoading) {
    return <LoadingAuth />
  }

  if (!user) {
    return <Redirect href={"/(public)"} />
  }

  return (
    <Tabs screenOptions={{
      tabBarInactiveTintColor: "#A9A9A9",
      tabBarActiveTintColor: "black",

    }}
      tabBar={(props) => <CustomBottomNavigation {...props} />} >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size-2} name="home" color={color} />,
        }}
      />

      <Tabs.Screen name="orc"
        options={{
          title: 'Orçamento',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size-2} name="file-pdf-o" color={color} />,
        }}
      />

      <Tabs.Screen name="data"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size-2} name="gear" color={color} />,
        }}
      />
    </Tabs>
  )
}
