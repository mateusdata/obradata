import AuthProvider from "@/contexts/AuthProvider";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
  
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Slot />
    </AuthProvider>
  )
}
