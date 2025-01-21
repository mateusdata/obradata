import React from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      {user?.photo ? (
        <Avatar.Image
          source={{ uri: user.photo }}
          size={100}
          style={styles.avatar}
        />
      ) : (
        <Avatar.Text
            label={user?.name?.charAt(0).toUpperCase() || "U"}
          size={100}
          style={styles.avatar}
        />
      )}

      <Text style={styles.name}>{user?.name || "Usuário"}</Text>
      <Text style={styles.email}>{user?.email || "email@exemplo.com"}</Text>

      <Button
        mode="contained"
        onPress={signOut}
        style={styles.button}
        buttonColor="#ff5252"
        textColor="#fff"
      >
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  avatar: {
    marginBottom: 20,
    backgroundColor: "#6200ee",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 0,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
});
