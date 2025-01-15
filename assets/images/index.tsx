import { useAuth } from "@/contexts/AuthProvider";
import { Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const {user} =  useAuth()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. {JSON.stringify(user, null, 2)} </Text>
    </View>
  );
}
