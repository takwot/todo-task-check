interface IUser {
  email: string;
}

export interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearStore: () => void;
}
