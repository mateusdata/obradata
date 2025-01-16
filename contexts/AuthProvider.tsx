import { AuthContextData, User } from '@/types/types'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    loadStorageData()
  }, [user])

  const loadStorageData = async () => {
    try {
      setIsLoading(true)
      await AsyncStorage.clear();
      const recoverdUser = await AsyncStorage.getItem("user")
      if (recoverdUser !== null) {
        alert("tem dados")
        console.log(recoverdUser);
        setUser(JSON.parse(recoverdUser))
      }
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
    }
  }

  const signIn = async (myUser: User) => {
    console.log(myUser);


    try {

      await AsyncStorage.setItem("user", JSON.stringify(myUser))
      // await saveToken("14ssdsds444sdsdsdsdsd")
      setUser(myUser);
      router.replace("/(tabs)")

    } catch (error) {
      console.log(error);

    }
  }
  const signOut = async () => {
    setUser(null)
    await AsyncStorage.clear();
  }
  const signUp = async (user: User) => {
    setUser(user)
  }

  const saveToken = async (value: string) => {
    const response = await SecureStore.setItemAsync("token", value)
    console.log(response);

  }

  const getToken = async () => {
    const response = await SecureStore.getItemAsync("token")
    console.log(response);
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      signUp,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider")
  }
  return context
}

export { useAuth }