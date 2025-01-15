export interface User {
  name?: string;
  email?: string;
  password?: string;
}

export interface AuthContextData {
  user: User | null;
  signIn(user: User): Promise<void>;
  signOut(): void;
  signUp(user: User): Promise<void>;
  isLoading: boolean
  setIsLoading?: (value: boolean) => void
}