import { AuthContextData, User } from '@/types/types'
import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (user: User) => {
    setUser(user)
  }
  const signOut = async () => {
    setUser(user)
  }
  const signUp = async (user: User) => {
    setUser(user)
  }

  

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      signUp
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
}

export { useAuth }