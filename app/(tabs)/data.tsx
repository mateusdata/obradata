import { useAuth } from "@/contexts/AuthProvider";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { user, signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      }}
    >
      <Text>Home</Text>
      <Button
      onPress={signOut}
        buttonColor="red"
        textColor="white">
        Sair
      </Button>
    </View>
  );
}
