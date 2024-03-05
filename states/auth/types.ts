export type AuthStore = IAuthStoreStates & IAuthStoreActions;

export interface IAuthStoreStates {
  // TODO: Add types
  user: any | null;
  access: string | null;
  refresh: string | null;
}

export interface IAuthStoreActions {
  // TODO: Add types
  authenticate: (request: any) => Promise<void>;
  setUser: (user: any) => void;
  logout: () => void;
}
