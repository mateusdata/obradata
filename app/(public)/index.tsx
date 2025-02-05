// app/screens/LoginScreen.js

import { useAuth } from '@/contexts/AuthProvider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleConfigure } from '@/constants/GoogleConfigure';
import { colorPrimary, colorPrimaryDark } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
GoogleSignin.configure();

GoogleSignin.configure(GoogleConfigure);

export default function LoginScreen() {
  const { signIn, user } = useAuth();
  const [state, setState] = useState<any>({ userInfo: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn2 = async () => {
    setIsLoading(true);
    try {
      // Certifique-se de que o Google Play Services está disponíve
      await GoogleSignin.signOut()
      await GoogleSignin.hasPlayServices();

      // Sempre forçar a escolha de conta do Google
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // Se o login for bem-sucedido, armazene as informações do usuário e faça o login no sistema
        setState({ userInfo: response.data });
        signIn(response.data.user);
      } else {
        // O usuário cancelou o login
        console.log("Login cancelado");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // A operação de login já está em andamento
            console.log("A operação de login já está em andamento");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Serviços do Google Play não estão disponíveis
            console.log("Serviços do Google Play não disponíveis");
            break;
          default:
            console.log("Erro desconhecido", error);
        }
      } else {
        // Outro erro não relacionado ao Google Sign-In
        console.log("Erro desconhecido", error);
      }
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao Obra Fácil</Text>
      <Button
        loading={isLoading}
        disabled={isLoading}
        onPress={signIn2}
        mode='contained'
        icon={() => <Image resizeMode='center' width={22} height={22} source={{uri:"https://img.icons8.com/?size=100&id=17949&format=png&color=000000"} } />}
        buttonColor={colorPrimaryDark}
        style={styles.button}>
        Entrar com o Google
      </Button>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 25,
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
    width: "90%",
  },
  forgotPassword: {
    color: '#0066cc',
    textAlign: 'center',
    marginTop: 15,
  },
});
