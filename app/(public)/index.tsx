// app/screens/LoginScreen.js

import { useAuth } from '@/contexts/AuthProvider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure();

GoogleSignin.configure({
  webClientId: '157927205477-go5641cmd0lb3arct2vfasvrphatomdh.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile  
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

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
      <Button loading={isLoading} disabled={isLoading} onPress={signIn2} mode='contained' style={styles.button}>
        Fazer login

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
