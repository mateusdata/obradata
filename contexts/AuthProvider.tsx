import { AuthContextData, User } from '@/types/types'
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>({
    email:"Mateuspele2015@gmail.com",
    name:"Mateus",
  });

  const [isLoading, setIsLoading ]  = useState<boolean>(false)

  const signIn = async (user: User) => {
    setUser(user)
  }
  const signOut = async () => {
    setUser(user)
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