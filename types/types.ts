export interface User {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  givenName?: string;
  familyName?: string | null;
  id?: string;
}

export interface AuthContextData {
  user: User | null;
  signIn(user: any): Promise<void>;
  signOut(): void;
  signUp(user: User): Promise<void>;
  isLoading: boolean
  setIsLoading?: (value: boolean) => void
}