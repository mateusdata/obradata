// app/screens/LoginScreen.js

import { useAuth } from '@/contexts/AuthProvider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, user } = useAuth();
  const handleLogin = () => {
    if (true) {
      signIn({ email: "mateus@gmail.com", name: 'Mateus' });
    } else {
      alert('E-mail ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao Obra Fácil</Text>
      <Text style={styles.header}>{JSON.stringify(user, null, 2)}</Text>


      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        buttonColor="#996DFF"
        style={styles.button}
      >
        Entrar
      </Button>

      <TouchableOpacity onPress={() => alert('Redirecionar para tela de recuperação de senha')}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  forgotPassword: {
    color: '#0066cc',
    textAlign: 'center',
    marginTop: 15,
  },
});
